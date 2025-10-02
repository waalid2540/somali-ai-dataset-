# Backend API Endpoints Guide

## 🔧 Required API Endpoints for Video Meetings

All Supabase calls have been removed. You need to implement these endpoints in your PostgreSQL backend.

---

## 📍 API Base URL

Set in your `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# Or your production URL: https://api.yourbackend.com/api
```

---

## 🔐 Authentication Endpoints

### 1. GET `/api/auth/me`
**Purpose**: Get current logged-in user

**Request**:
```
GET /api/auth/me
Headers:
  Cookie: session_token=xxx (or Authorization: Bearer xxx)
```

**Response** (200 OK):
```json
{
  "id": "user-uuid-123",
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Response** (401 Unauthorized):
```json
{
  "error": "Not authenticated"
}
```

---

## 💳 Subscription Endpoints

### 2. GET `/api/subscriptions/check/:userId`
**Purpose**: Check if user has active subscription

**Request**:
```
GET /api/subscriptions/check/user-uuid-123
Headers:
  Cookie: session_token=xxx
```

**Response** (200 OK):
```json
{
  "isSubscribed": true,
  "plan": "Video Meetings Unlimited",
  "status": "active",
  "expiresAt": "2025-11-01T00:00:00Z"
}
```

**Response** (200 OK - Not Subscribed):
```json
{
  "isSubscribed": false
}
```

---

## 📹 Meeting Endpoints

### 3. GET `/api/meetings?userId=xxx`
**Purpose**: Get all meetings created by a user

**Request**:
```
GET /api/meetings?userId=user-uuid-123
Headers:
  Cookie: session_token=xxx
```

**Response** (200 OK):
```json
[
  {
    "id": "meeting-uuid-1",
    "room_name": "Team Standup",
    "meeting_url": "https://yoursite.com/room/123456789-abc",
    "created_by": "user-uuid-123",
    "created_at": "2025-10-01T10:00:00Z",
    "is_active": true
  },
  {
    "id": "meeting-uuid-2",
    "room_name": "Client Call",
    "meeting_url": "https://yoursite.com/room/987654321-xyz",
    "created_by": "user-uuid-123",
    "created_at": "2025-09-28T14:30:00Z",
    "is_active": true
  }
]
```

**Response** (Empty Array):
```json
[]
```

---

### 4. POST `/api/meetings`
**Purpose**: Create a new meeting

**Request**:
```
POST /api/meetings
Headers:
  Content-Type: application/json
  Cookie: session_token=xxx

Body:
{
  "room_name": "Team Standup",
  "meeting_url": "https://yoursite.com/room/123456789-abc",
  "created_by": "user-uuid-123",
  "is_active": true
}
```

**Response** (201 Created):
```json
{
  "id": "meeting-uuid-new",
  "room_name": "Team Standup",
  "meeting_url": "https://yoursite.com/room/123456789-abc",
  "created_by": "user-uuid-123",
  "created_at": "2025-10-01T10:00:00Z",
  "is_active": true
}
```

**Response** (401 Unauthorized):
```json
{
  "error": "Not authenticated"
}
```

**Response** (403 Forbidden):
```json
{
  "error": "No active subscription"
}
```

---

## 🗄️ Database Schema (PostgreSQL)

You already have `video-meetings-migration.sql` - use that to create tables in your PostgreSQL database.

### Key Tables:

#### `meetings` table
```sql
CREATE TABLE meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_name TEXT NOT NULL,
  meeting_url TEXT NOT NULL,
  created_by UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  participant_count INTEGER DEFAULT 0,
  duration_minutes INTEGER DEFAULT 0
);
```

#### `subscriptions` table (if not exists)
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  plan_name TEXT NOT NULL,
  status TEXT NOT NULL, -- 'active', 'cancelled', 'expired'
  price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);
```

---

## 🔒 Authentication Flow

The frontend expects **cookie-based authentication** (`withCredentials: true`).

### Option 1: Cookie Session
```javascript
// Your backend sets HTTP-only cookie after login
res.cookie('session_token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
```

### Option 2: JWT Token
If you prefer JWT in headers instead:

**Frontend changes needed**:
```typescript
// Replace withCredentials with Authorization header
const response = await axios.get(`${API_BASE_URL}/auth/me`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
```

---

## 📝 Example Backend Implementation (Node.js/Express)

```javascript
const express = require('express');
const { Pool } = require('pg');
const app = express();

// PostgreSQL connection
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'your_database',
  user: 'your_user',
  password: 'your_password'
});

// Middleware to verify authentication
const authenticate = async (req, res, next) => {
  const sessionToken = req.cookies.session_token;

  if (!sessionToken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  // Verify token and get user
  const user = await verifySession(sessionToken);

  if (!user) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  req.user = user;
  next();
};

// 1. Get current user
app.get('/api/auth/me', authenticate, (req, res) => {
  res.json(req.user);
});

// 2. Check subscription
app.get('/api/subscriptions/check/:userId', authenticate, async (req, res) => {
  const { userId } = req.params;

  const result = await pool.query(
    `SELECT * FROM subscriptions
     WHERE user_id = $1 AND status = 'active' AND expires_at > NOW()`,
    [userId]
  );

  if (result.rows.length > 0) {
    res.json({
      isSubscribed: true,
      plan: result.rows[0].plan_name,
      status: result.rows[0].status,
      expiresAt: result.rows[0].expires_at
    });
  } else {
    res.json({ isSubscribed: false });
  }
});

// 3. Get user meetings
app.get('/api/meetings', authenticate, async (req, res) => {
  const { userId } = req.query;

  const result = await pool.query(
    `SELECT * FROM meetings
     WHERE created_by = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  res.json(result.rows);
});

// 4. Create meeting
app.post('/api/meetings', authenticate, async (req, res) => {
  const { room_name, meeting_url, created_by, is_active } = req.body;

  // Check if user has active subscription
  const subCheck = await pool.query(
    `SELECT * FROM subscriptions
     WHERE user_id = $1 AND status = 'active' AND expires_at > NOW()`,
    [created_by]
  );

  if (subCheck.rows.length === 0) {
    return res.status(403).json({ error: 'No active subscription' });
  }

  // Create meeting
  const result = await pool.query(
    `INSERT INTO meetings (room_name, meeting_url, created_by, is_active)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [room_name, meeting_url, created_by, is_active]
  );

  res.status(201).json(result.rows[0]);
});

app.listen(5000, () => {
  console.log('API running on http://localhost:5000');
});
```

---

## 🚀 Quick Setup Steps

1. **Set your backend URL** in `.env.local`:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

2. **Run the database migration** (`video-meetings-migration.sql`) in your PostgreSQL

3. **Implement the 4 API endpoints** in your backend:
   - `GET /api/auth/me`
   - `GET /api/subscriptions/check/:userId`
   - `GET /api/meetings?userId=xxx`
   - `POST /api/meetings`

4. **Enable CORS** in your backend:
   ```javascript
   const cors = require('cors');
   app.use(cors({
     origin: 'http://localhost:3000', // Your frontend URL
     credentials: true
   }));
   ```

5. **Test the flow**:
   - Login → Get user → Check subscription → Create meeting

---

## ✅ Testing Checklist

- [ ] Can get current user from `/api/auth/me`
- [ ] Can check subscription status
- [ ] Can load user's meetings
- [ ] Can create new meeting
- [ ] Subscription gates work (blocks non-subscribers)
- [ ] Meeting rooms load with Jitsi
- [ ] Video/audio/screen sharing works

---

## 🔧 Troubleshooting

### CORS Errors
Add to your backend:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### Cookie Not Sent
Make sure:
- Backend sends `Set-Cookie` with `SameSite=lax`
- Frontend uses `withCredentials: true`
- Same domain or proper CORS setup

### 401 Errors
Check:
- Session token is valid
- Cookie is being sent in request
- Authentication middleware works

---

You're all set! Implement these 4 endpoints in your PostgreSQL backend and everything will work! 🚀
