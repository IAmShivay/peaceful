# AudioStream Pro - Developer Documentation

## 🎵 Overview

AudioStream Pro is a comprehensive Next.js SaaS platform for audio streaming and downloads with subscription management. Built with modern technologies and best practices for scalability and performance.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + Headless UI
- **State Management**: Redux Toolkit + RTK Query
- **UI Components**: Radix UI + Custom Components
- **Forms**: React Hook Form + Zod validation
- **Audio Player**: Howler.js
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js v5 with JWT
- **File Storage**: Cloudinary
- **Payments**: Stripe
- **Email**: Resend

### Development
- **Language**: TypeScript
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel

## 📁 Project Structure

```
audiostream-pro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (public)/          # Public pages
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # User dashboard
│   │   └── admin/             # Admin panel
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   ├── auth/             # Auth components
│   │   ├── audio/            # Audio player components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── admin/            # Admin components
│   │   └── common/           # Common components
│   ├── lib/                  # Utility libraries
│   │   ├── database/         # Database models & connection
│   │   ├── validations/      # Zod schemas
│   │   ├── utils/            # Helper functions
│   │   ├── stripe/           # Stripe integration
│   │   └── cloudinary/       # File upload
│   ├── store/                # Redux store
│   │   ├── slices/           # Redux slices
│   │   └── api/              # RTK Query APIs
│   ├── types/                # TypeScript types
│   └── hooks/                # Custom React hooks
├── public/                   # Static assets
└── docs/                     # Documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Stripe account
- Cloudinary account
- Google OAuth credentials (optional)

### 1. Clone & Install
```bash
git clone <repository-url>
cd audiostream-pro
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and fill in your values:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/audiostream

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email
RESEND_API_KEY=re_...
```

### 3. Database Setup
The application will automatically create the necessary collections and indexes when you first run it.

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🔐 Authentication System

### Features
- Email/password authentication
- Google OAuth integration
- JWT-based sessions
- Role-based access control (user/admin)
- Password reset functionality

### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

## 💳 Subscription Management

### Plans
- **Free**: Limited downloads, basic features
- **Pro**: Unlimited downloads, premium features
- **Unlimited**: Everything + exclusive content

### Stripe Integration
- Subscription creation and management
- Webhook handling for payment events
- Customer portal for self-service
- Usage-based billing support

## 🎵 Audio Management

### Features
- File upload with Cloudinary
- Audio metadata extraction
- Waveform generation
- Category management
- Search and filtering
- Download tracking
- Play history

### Supported Formats
- MP3, WAV, FLAC, AAC
- Maximum file size: 100MB
- Automatic format conversion

## 📊 Admin Dashboard

### Features
- User management
- Content management
- Analytics and reporting
- Subscription monitoring
- Revenue tracking
- System health monitoring

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Database
npm run db:seed      # Seed database with sample data
npm run db:reset     # Reset database
```

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm run start
```

## 📚 API Documentation

### Base URL
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

### Authentication
All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Response Format
```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {}
  }
}
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

## 🔍 Monitoring & Analytics

### Performance Monitoring
- Next.js Analytics
- Vercel Speed Insights
- Custom performance metrics

### Error Tracking
- Sentry integration
- Custom error boundaries
- API error logging

### User Analytics
- User behavior tracking
- Conversion funnel analysis
- A/B testing support

## 🚀 Performance Optimization

### Frontend
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Service worker for caching
- CDN for static assets

### Backend
- Database query optimization
- Redis caching layer
- API response compression
- Rate limiting

## 🔒 Security

### Measures Implemented
- CSRF protection
- XSS prevention
- SQL injection protection
- Rate limiting
- Input validation
- Secure headers
- Environment variable protection

## 📈 Scaling Considerations

### Database
- MongoDB Atlas auto-scaling
- Read replicas for performance
- Proper indexing strategy
- Connection pooling

### Application
- Horizontal scaling with load balancers
- Microservices architecture consideration
- CDN for global distribution
- Caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Write meaningful commit messages
- Add JSDoc comments for functions

## 📞 Support

For technical support or questions:
- Email: support@audiostreamPro.com
- Documentation: https://docs.audiostreamPro.com
- GitHub Issues: https://github.com/your-org/audiostream-pro/issues

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
