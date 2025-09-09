# AudioStream Pro API Documentation

## Overview

This document provides comprehensive documentation for the AudioStream Pro REST API. The API follows RESTful principles and returns JSON responses.

## Base URLs

- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-domain.com/api`

## Authentication

### JWT Token Authentication

Most endpoints require authentication via JWT tokens. Include the token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

### Getting a Token

Obtain a JWT token by logging in:

```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation completed successfully",
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      // Additional error details
    }
  }
}
```

## HTTP Status Codes

- `200` - OK: Request successful
- `201` - Created: Resource created successfully
- `400` - Bad Request: Invalid request data
- `401` - Unauthorized: Authentication required
- `403` - Forbidden: Insufficient permissions
- `404` - Not Found: Resource not found
- `422` - Unprocessable Entity: Validation errors
- `429` - Too Many Requests: Rate limit exceeded
- `500` - Internal Server Error: Server error

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Authenticated users**: 1000 requests per hour
- **Unauthenticated users**: 100 requests per hour

Rate limit headers are included in responses:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Pagination

List endpoints support pagination using query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)

Example:
```http
GET /api/sounds?page=2&limit=50
```

## Filtering and Sorting

### Filtering

Use query parameters to filter results:

```http
GET /api/sounds?category=electronic&duration_min=60&duration_max=300
```

### Sorting

Use the `sort` parameter:

```http
GET /api/sounds?sort=created_at:desc,title:asc
```

## Search

Use the `search` parameter for full-text search:

```http
GET /api/sounds?search=electronic+beat
```

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "subscription": {
        "plan": "free",
        "status": "active"
      }
    }
  },
  "message": "User registered successfully"
}
```

#### Login User
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

### Users

#### Get Current User
```http
GET /api/users/me
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "bio": "Music enthusiast",
  "preferences": {
    "emailNotifications": true,
    "autoPlay": false
  }
}
```

#### Get User Favorites
```http
GET /api/users/me/favorites
Authorization: Bearer <token>
```

#### Add to Favorites
```http
POST /api/users/me/favorites
Authorization: Bearer <token>
Content-Type: application/json

{
  "soundId": "64f8a1b2c3d4e5f6a7b8c9d0"
}
```

#### Remove from Favorites
```http
DELETE /api/users/me/favorites/64f8a1b2c3d4e5f6a7b8c9d0
Authorization: Bearer <token>
```

### Sounds

#### Get All Sounds
```http
GET /api/sounds?page=1&limit=20&category=electronic&search=beat
```

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page
- `category` - Filter by category
- `search` - Search term
- `duration_min` - Minimum duration in seconds
- `duration_max` - Maximum duration in seconds
- `sort` - Sort order (e.g., `created_at:desc`)

#### Get Sound by ID
```http
GET /api/sounds/64f8a1b2c3d4e5f6a7b8c9d0
```

#### Download Sound
```http
POST /api/sounds/64f8a1b2c3d4e5f6a7b8c9d0/download
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://cloudinary.com/download-url",
    "expiresAt": "2024-01-01T12:00:00Z"
  }
}
```

#### Track Play
```http
POST /api/sounds/play
Authorization: Bearer <token>
Content-Type: application/json

{
  "soundId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "duration": 180
}
```

### Categories

#### Get All Categories
```http
GET /api/categories
```

#### Get Category by ID
```http
GET /api/categories/64f8a1b2c3d4e5f6a7b8c9d0
```

### Subscriptions

#### Get Subscription Plans
```http
GET /api/plans
```

#### Create Subscription
```http
POST /api/subscriptions
Authorization: Bearer <token>
Content-Type: application/json

{
  "planId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "paymentMethodId": "pm_1234567890"
}
```

#### Get Current Subscription
```http
GET /api/subscriptions/current
Authorization: Bearer <token>
```

#### Cancel Subscription
```http
DELETE /api/subscriptions/current
Authorization: Bearer <token>
```

#### Create Customer Portal Session
```http
POST /api/subscriptions/portal
Authorization: Bearer <token>
```

### Admin Endpoints

#### Get Dashboard Stats
```http
GET /api/admin/stats
Authorization: Bearer <admin-token>
```

#### Upload Sound
```http
POST /api/admin/upload
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data

{
  "audio": <file>,
  "title": "New Track",
  "description": "Amazing new track",
  "category": "64f8a1b2c3d4e5f6a7b8c9d0",
  "tags": "electronic,beat,loop"
}
```

#### Get All Users
```http
GET /api/admin/users?page=1&limit=20
Authorization: Bearer <admin-token>
```

#### Update User
```http
PUT /api/admin/users/64f8a1b2c3d4e5f6a7b8c9d0
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "role": "admin",
  "subscription": {
    "plan": "pro",
    "status": "active"
  }
}
```

## Webhooks

### Stripe Webhooks

Handle Stripe webhook events:

```http
POST /api/webhooks/stripe
Content-Type: application/json
Stripe-Signature: <signature>

{
  "type": "invoice.payment_succeeded",
  "data": {
    // Stripe event data
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Request validation failed |
| `AUTHENTICATION_REQUIRED` | Authentication token required |
| `INSUFFICIENT_PERMISSIONS` | User lacks required permissions |
| `RESOURCE_NOT_FOUND` | Requested resource not found |
| `DUPLICATE_RESOURCE` | Resource already exists |
| `SUBSCRIPTION_REQUIRED` | Premium subscription required |
| `DOWNLOAD_LIMIT_EXCEEDED` | User download limit exceeded |
| `FILE_TOO_LARGE` | Uploaded file exceeds size limit |
| `UNSUPPORTED_FORMAT` | File format not supported |
| `RATE_LIMIT_EXCEEDED` | Too many requests |

## SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install audiostream-pro-sdk
```

```javascript
import { AudioStreamClient } from 'audiostream-pro-sdk';

const client = new AudioStreamClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.audiostreamPro.com'
});

const sounds = await client.sounds.list({ category: 'electronic' });
```

### Python
```bash
pip install audiostream-pro-python
```

```python
from audiostream_pro import AudioStreamClient

client = AudioStreamClient(api_key='your-api-key')
sounds = client.sounds.list(category='electronic')
```

## Testing

Use the provided Postman collection for testing:
- Import `docs/AudioStream-Pro-API.postman_collection.json`
- Set environment variables for `baseUrl` and `authToken`
- Run the collection to test all endpoints

## Support

For API support:
- Email: api-support@audiostreamPro.com
- Documentation: https://docs.audiostreamPro.com
- Status Page: https://status.audiostreamPro.com
