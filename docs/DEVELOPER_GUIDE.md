# AudioStream Pro - Developer Guide

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB 5.0+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/audiostream-pro.git
cd audiostream-pro

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start MongoDB (if running locally)
mongod

# Seed the database
npm run db:seed

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/audiostream-pro

# NextAuth.js
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-here

# File Storage (Optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe (Optional)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS 3.4
- **Authentication**: NextAuth.js v5
- **Database**: MongoDB with Mongoose
- **File Storage**: Cloudinary (configurable)
- **Payment**: Stripe (optional)
- **State Management**: React Context + Hooks

### Project Structure

```
audiostream-pro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # API routes
│   │   └── dashboard/         # User dashboard
│   ├── components/            # Reusable components
│   │   ├── common/           # Common components
│   │   ├── ui/               # UI components
│   │   └── demo/             # Demo components
│   ├── lib/                  # Utilities and configurations
│   │   ├── auth.ts           # NextAuth configuration
│   │   └── database/         # Database models and connection
│   └── types/                # TypeScript type definitions
├── docs/                     # Documentation
├── scripts/                  # Database scripts
└── public/                   # Static assets
```

## 🔐 Authentication

### Demo Credentials

```javascript
// Regular Users
const users = [
  { email: 'demo@example.com', password: 'demo123' },
  { email: 'user@audiostreamPro.com', password: 'user123' },
  { email: 'test@example.com', password: 'test123' }
];

// Admin Users
const admins = [
  { email: 'admin@example.com', password: 'admin123' },
  { email: 'admin@audiostreamPro.com', password: 'admin123' }
];
```

### Authentication Flow

1. **Registration**: POST `/api/auth/register`
2. **Login**: POST `/api/auth/signin`
3. **Session**: GET `/api/auth/session`
4. **Logout**: POST `/api/auth/signout`

### Protected Routes

- `/dashboard/*` - User authentication required
- `/admin/*` - Admin authentication required

## 📊 Database Schema

### User Model

```typescript
interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked';
  subscription?: ObjectId;
  downloadCount: number;
  monthlyDownloadCount: number;
  lastDownloadReset: Date;
  favorites: ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### AudioFile Model

```typescript
interface IAudioFile {
  title: string;
  description?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  duration: number;
  format: string;
  category: ObjectId;
  tags: string[];
  uploadedBy: ObjectId;
  isPublic: boolean;
  isPremium: boolean;
  downloadCount: number;
  playCount: number;
  likes: number;
  metadata: {
    bitrate: number;
    sampleRate: number;
    channels: number;
    codec: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript check

# Database
npm run db:seed         # Seed database with sample data
npm run db:reset        # Reset database (clear all data)
```

### API Development

#### Creating New Endpoints

1. Create route file in `src/app/api/`
2. Export HTTP method functions (GET, POST, PUT, DELETE)
3. Add authentication middleware if needed
4. Update API documentation

Example:

```typescript
// src/app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Your logic here
    
    return NextResponse.json({ data: 'success' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Component Development

#### Best Practices

1. Use TypeScript for all components
2. Follow the component structure:
   - Props interface
   - Component function
   - Default export

```typescript
// components/example/ExampleComponent.tsx
interface ExampleComponentProps {
  title: string;
  onAction?: () => void;
}

export default function ExampleComponent({ title, onAction }: ExampleComponentProps) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {onAction && (
        <button onClick={onAction} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Action
        </button>
      )}
    </div>
  );
}
```

## 🎨 Styling Guidelines

### Tailwind CSS Classes

Use consistent spacing and color schemes:

```css
/* Spacing */
.spacing-sm { @apply p-4 m-2; }
.spacing-md { @apply p-6 m-4; }
.spacing-lg { @apply p-8 m-6; }

/* Colors */
.primary { @apply bg-blue-600 text-white; }
.secondary { @apply bg-gray-600 text-white; }
.success { @apply bg-emerald-600 text-white; }
.danger { @apply bg-red-600 text-white; }

/* Gradients */
.gradient-primary { @apply bg-gradient-to-r from-blue-600 to-purple-600; }
.gradient-success { @apply bg-gradient-to-r from-emerald-500 to-emerald-600; }
```

### Component Styling

- Use `rounded-xl` for modern card designs
- Apply `shadow-xl` for elevated components
- Use gradients for primary actions
- Implement hover states with `transition-all duration-200`

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

### Testing Guidelines

1. Test all API endpoints
2. Test authentication flows
3. Test file upload functionality
4. Test admin operations

## 📦 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Environment Setup

1. Set up MongoDB Atlas or self-hosted MongoDB
2. Configure Cloudinary for file storage
3. Set up Stripe for payments (optional)
4. Configure domain and SSL

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## 🔧 Configuration

### NextAuth.js Configuration

```typescript
// lib/auth.ts
export const authOptions = {
  providers: [
    CredentialsProvider({
      // Configuration
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // JWT callback
    },
    session: async ({ session, token }) => {
      // Session callback
    }
  }
};
```

### Database Configuration

```typescript
// lib/database/connection.ts
import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check MongoDB is running
   - Verify connection string
   - Check network connectivity

2. **Authentication Issues**
   - Verify NEXTAUTH_SECRET is set
   - Check session configuration
   - Validate credentials

3. **File Upload Issues**
   - Check file size limits
   - Verify file type restrictions
   - Ensure proper form encoding

### Debug Mode

Enable debug logging:

```env
DEBUG=true
NODE_ENV=development
```

## 🔍 API Testing

### Using Postman

1. Import the collection: `docs/AudioStream_Pro_API.postman_collection.json`
2. Set up environment variables:
   - `base_url`: http://localhost:3001
   - `auth_token`: (will be auto-set after login)
3. Test authentication endpoints first
4. Use the token for protected routes

### Manual Testing

```bash
# Test user registration
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test admin stats
curl -X GET http://localhost:3001/api/admin/stats \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test file upload
curl -X POST http://localhost:3001/api/admin/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/audio.mp3" \
  -F "title=Test Audio" \
  -F "category=electronic" \
  -F "isPublic=true"
```

## 🚀 Performance Optimization

### Database Optimization

```javascript
// Add indexes for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1, status: 1 });
AudioFileSchema.index({ uploadedBy: 1, createdAt: -1 });
AudioFileSchema.index({ category: 1, isPublic: 1 });
```

### Caching Strategy

```javascript
// Redis caching for frequently accessed data
const redis = require('redis');
const client = redis.createClient();

// Cache user stats
const cacheUserStats = async (userId, stats) => {
  await client.setex(`user:stats:${userId}`, 300, JSON.stringify(stats));
};
```

### File Upload Optimization

```javascript
// Compress audio files before upload
const ffmpeg = require('fluent-ffmpeg');

const compressAudio = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .audioBitrate(128)
      .audioChannels(2)
      .audioFrequency(44100)
      .format('mp3')
      .save(outputPath)
      .on('end', resolve)
      .on('error', reject);
  });
};
```

## 📊 Monitoring and Analytics

### Health Check Endpoint

```typescript
// src/app/api/health/route.ts
export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      database: await checkDatabase(),
      storage: await checkStorage(),
      auth: await checkAuth()
    }
  };

  return NextResponse.json(health);
}
```

### Error Tracking

```javascript
// Integrate with Sentry for error tracking
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com/docs)
- [Postman Documentation](https://learning.postman.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Update documentation
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add JSDoc comments for functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@audiostreamPro.com
- 💬 Discord: [AudioStream Pro Community](https://discord.gg/audiostreamPro)
- 📖 Wiki: [GitHub Wiki](https://github.com/your-org/audiostream-pro/wiki)
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/audiostream-pro/issues)
