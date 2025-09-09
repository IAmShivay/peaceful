# AudioStream Pro API Documentation

## Overview

AudioStream Pro is a comprehensive SaaS platform for audio streaming and downloads with subscription management. This documentation covers all API endpoints, authentication, and best practices.

## Base URL

```
Development: http://localhost:3001
Production: https://your-domain.com
```

## Authentication

AudioStream Pro uses NextAuth.js v5 for authentication with JWT tokens.

### Authentication Headers

```http
Authorization: Bearer <jwt_token>
Cookie: authjs.session-token=<session_token>
```

### User Roles

- `user`: Regular user with basic access
- `admin`: Administrator with full platform access

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### POST /api/auth/signin
Sign in with credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET /api/auth/session
Get current user session.

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "expires": "2024-12-31T23:59:59.999Z"
}
```

### Admin Endpoints

#### GET /api/admin/stats
Get admin dashboard statistics.

**Authentication:** Admin required

**Response:**
```json
{
  "totalUsers": 1250,
  "newUsersToday": 15,
  "totalAudioFiles": 3420,
  "totalDownloads": 45670,
  "downloadsToday": 234,
  "totalRevenue": 12450.50,
  "revenueToday": 145.25,
  "activeUsers": 890
}
```

#### GET /api/admin/users
Get all users with pagination and filtering.

**Authentication:** Admin required

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term for name/email
- `role`: Filter by role (user/admin)
- `status`: Filter by status (active/blocked)

**Response:**
```json
{
  "users": [
    {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "lastLoginAt": "2024-01-15T10:30:00.000Z",
      "totalUploads": 5,
      "totalDownloads": 25
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 125,
    "totalUsers": 1250,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### PUT /api/admin/users/[id]
Update user status or role.

**Authentication:** Admin required

**Request Body:**
```json
{
  "status": "blocked",
  "role": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "user": {
    "id": "user_id",
    "status": "blocked",
    "role": "admin"
  }
}
```

#### GET /api/admin/activity
Get recent platform activity.

**Authentication:** Admin required

**Response:**
```json
{
  "activities": [
    {
      "id": "activity_id",
      "type": "user_registered",
      "message": "New user John Doe registered",
      "timestamp": "2024-01-15T10:30:00.000Z",
      "userId": "user_id"
    },
    {
      "id": "activity_id_2",
      "type": "audio_uploaded",
      "message": "User uploaded 'Amazing Track.mp3'",
      "timestamp": "2024-01-15T10:25:00.000Z",
      "userId": "user_id_2"
    }
  ]
}
```

#### POST /api/admin/upload
Upload audio files (Admin only).

**Authentication:** Admin required

**Content-Type:** multipart/form-data

**Form Data:**
- `file`: Audio file (MP3, WAV, FLAC, AAC, M4A, OGG)
- `title`: Audio title
- `description`: Audio description
- `category`: Category name
- `tags`: JSON array of tags
- `isPublic`: Boolean (true/false)
- `isPremium`: Boolean (true/false)

**Response:**
```json
{
  "success": true,
  "audioFile": {
    "id": "audio_id",
    "title": "Amazing Track",
    "description": "A wonderful audio track",
    "fileUrl": "https://cdn.example.com/audio/amazing-track.mp3",
    "duration": 180,
    "category": "Electronic",
    "tags": ["electronic", "ambient"],
    "isPublic": true,
    "isPremium": false
  }
}
```

### User Endpoints

#### GET /api/user/stats
Get user personal statistics.

**Authentication:** User required

**Response:**
```json
{
  "totalUploads": 5,
  "totalPlays": 1250,
  "totalDownloads": 340,
  "totalLikes": 89,
  "monthlyPlays": 156,
  "weeklyPlays": 45
}
```

#### GET /api/user/audio
Get user's uploaded audio files.

**Authentication:** User required

**Response:**
```json
{
  "audioFiles": [
    {
      "id": "audio_id",
      "title": "My Track",
      "duration": 180,
      "playCount": 45,
      "downloadCount": 12,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

### Common HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Validation Error
- `500`: Internal Server Error

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- Authentication endpoints: 5 requests per minute
- Upload endpoints: 10 requests per hour
- General endpoints: 100 requests per minute

## File Upload Guidelines

### Supported Audio Formats

- MP3 (recommended)
- WAV
- FLAC
- AAC
- M4A
- OGG

### File Size Limits

- Maximum file size: 100MB
- Recommended size: Under 50MB for optimal performance

### Audio Quality Guidelines

- Bitrate: 128-320 kbps
- Sample Rate: 44.1 kHz or 48 kHz
- Channels: Mono or Stereo

## Best Practices

### API Usage

1. **Always include proper authentication headers**
2. **Handle rate limiting gracefully**
3. **Validate data before sending requests**
4. **Use appropriate HTTP methods**
5. **Handle errors properly**

### Security

1. **Never expose API keys in client-side code**
2. **Use HTTPS in production**
3. **Validate file uploads on both client and server**
4. **Implement proper CORS policies**

### Performance

1. **Use pagination for large datasets**
2. **Implement caching where appropriate**
3. **Compress large payloads**
4. **Use CDN for file delivery**

## SDK and Libraries

### JavaScript/TypeScript

```javascript
// Example API client
class AudioStreamAPI {
  constructor(baseURL, token) {
    this.baseURL = baseURL;
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  async getStats() {
    return this.request('/api/admin/stats');
  }

  async uploadAudio(formData) {
    return this.request('/api/admin/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        // Don't set Content-Type for FormData
      },
    });
  }
}
```

## Webhooks

AudioStream Pro supports webhooks for real-time notifications:

### Supported Events

- `user.registered`: New user registration
- `audio.uploaded`: New audio file uploaded
- `subscription.created`: New subscription created
- `subscription.cancelled`: Subscription cancelled

### Webhook Payload

```json
{
  "event": "user.registered",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Support

For API support and questions:

- Email: api-support@audiostreamPro.com
- Documentation: https://docs.audiostreamPro.com
- Status Page: https://status.audiostreamPro.com

## Changelog

### v1.0.0 (2024-01-15)
- Initial API release
- Authentication endpoints
- Admin dashboard APIs
- User management
- File upload functionality
