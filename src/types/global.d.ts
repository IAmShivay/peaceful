import mongoose from 'mongoose';
import { DefaultSession } from 'next-auth';

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      subscription: {
        plan: string;
        status: string;
      };
    } & DefaultSession['user'];
  }

  interface User {
    role: string;
    subscription: {
      plan: string;
      status: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
    subscription: {
      plan: string;
      status: string;
    };
  }
}
