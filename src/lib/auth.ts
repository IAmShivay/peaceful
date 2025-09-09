import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/database/connection';
import User from '@/lib/database/models/User';
import { loginSchema } from '@/lib/validations/auth';

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const validatedFields = loginSchema.safeParse(credentials);

          if (!validatedFields.success) {
            return null;
          }

          const { email, password } = validatedFields.data;

          // Demo credentials for testing
          const demoUsers = [
            {
              id: '1',
              email: 'demo@example.com',
              password: 'demo123',
              name: 'Demo User',
              role: 'user',
            },
            {
              id: '2',
              email: 'admin@example.com',
              password: 'admin123',
              name: 'Admin User',
              role: 'admin',
            },
            {
              id: '3',
              email: 'user@audiostreamPro.com',
              password: 'user123',
              name: 'John Doe',
              role: 'user',
            },
            {
              id: '4',
              email: 'admin@audiostreamPro.com',
              password: 'admin123',
              name: 'Admin User',
              role: 'admin',
            },
          ];

          // Find demo user
          const demoUser = demoUsers.find(u => u.email === email && u.password === password);

          if (demoUser) {
            console.log('✅ Demo user authenticated:', email);
            return {
              id: demoUser.id,
              email: demoUser.email,
              name: demoUser.name,
              role: demoUser.role,
              subscription: null,
            };
          }

          // Try database authentication as fallback
          try {
            await connectDB();
            const user = await User.findOne({ email });

            if (user && user.password) {
              const passwordsMatch = await bcrypt.compare(password, user.password);

              if (passwordsMatch) {
                console.log('✅ Database user authenticated:', email);
                return {
                  id: user._id.toString(),
                  email: user.email,
                  name: user.name,
                  role: user.role,
                  subscription: user.subscription || null,
                };
              }
            }
          } catch (dbError) {
            console.log('Database auth failed, using demo credentials only');
          }

          console.log('❌ Authentication failed for:', email);
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.subscription = user.subscription;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
        session.user.subscription = token.subscription as any;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
