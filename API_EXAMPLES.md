# API Request/Response Examples

This document provides detailed examples of API requests and responses for the Email Engagement System.

## Table of Contents

- [Account APIs](#account-apis)
- [Activity APIs](#activity-apis)
- [Analytics APIs](#analytics-apis)
- [Logs APIs](#logs-apis)

---

## Account APIs

### Create Account

**Request:**
```http
POST /api/accounts HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "email": "alice@example.com",
  "name": "Alice Johnson"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "alice@example.com",
    "name": "Alice Johnson",
    "is_active": 1,
    "daily_limit": 5,
    "current_daily_count": 0,
    "total_sent": 0,
    "total_received": 0,
    "reputation_score": 0,
    "created_at": "2026-05-11T10:30:00.000Z",
    "updated_at": "2026-05-11T10:30:00.000Z"
  }
}
```

**Error Response (409 Conflict):**
```json
{
  "success": false,
  "error": "Account with this email already exists"
}
```

### Get All Accounts

**Request:**
```http
GET /api/accounts HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "email": "alice@example.com",
      "name": "Alice Johnson",
      "is_active": 1,
      "daily_limit": 8,
      "current_daily_count": 3,
      "total_sent": 15,
      "total_received": 12,
      "reputation_score": 45.67,
      "created_at": "2026-05-11T10:30:00.000Z",
      "updated_at": "2026-05-11T14:20:00.000Z"
    },
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "email": "bob@example.com",
      "name": "Bob Smith",
      "is_active": 1,
      "daily_limit": 7,
      "current_daily_count": 2,
      "total_sent": 10,
      "total_received": 14,
      "reputation_score": 52.34,
      "created_at": "2026-05-11T10:31:00.000Z",
      "updated_at": "2026-05-11T14:15:00.000Z"
    }
  ]
}
```

### Get Account Statistics

**Request:**
```http
GET /api/accounts/a1b2c3d4-e5f6-7890-abcd-ef1234567890/statistics HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "alice@example.com",
    "name": "Alice Johnson",
    "is_active": 1,
    "daily_limit": 8,
    "current_daily_count": 3,
    "total_sent": 15,
    "total_received": 12,
    "reputation_score": 45.67,
    "created_at": "2026-05-11T10:30:00.000Z",
    "updated_at": "2026-05-11T14:20:00.000Z",
    "statistics": {
      "total_interactions": 27,
      "total_replies": 8
    },
    "reputation_history": [
      {
        "id": "rep-1",
        "account_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "reputation_score": 45.67,
        "recorded_at": "2026-05-11T14:20:00.000Z"
      },
      {
        "id": "rep-2",
        "account_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "reputation_score": 42.15,
        "recorded_at": "2026-05-11T14:15:00.000Z"
      }
    ]
  }
}
```

### Enable/Disable Account

**Request (Enable):**
```http
PATCH /api/accounts/a1b2c3d4-e5f6-7890-abcd-ef1234567890/enable HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Account enabled successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "alice@example.com",
    "name": "Alice Johnson",
    "is_active": 1,
    "daily_limit": 8,
    "current_daily_count": 3,
    "total_sent": 15,
    "total_received": 12,
    "reputation_score": 45.67,
    "created_at": "2026-05-11T10:30:00.000Z",
    "updated_at": "2026-05-11T14:25:00.000Z"
  }
}
```

---

## Activity APIs

### Start Activity Engine

**Request:**
```http
POST /api/activity/start HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Activity engine started successfully",
  "data": {
    "schedule": "*/5 * * * *",
    "status": "running"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Engine already running"
}
```

### Get Engine Status

**Request:**
```http
GET /api/activity/status HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "is_running": true,
    "cycle_count": 15,
    "last_run_at": "2026-05-11T14:20:00.000Z",
    "total_cycles": 15
  }
}
```

### Run Manual Cycle

**Request:**
```http
POST /api/activity/run-cycle HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Activity cycle completed",
  "data": {
    "emails_sent": 8,
    "replies_generated": 5,
    "accounts_updated": 10,
    "errors": 0
  }
}
```

---

## Analytics APIs

### Get System Analytics

**Request:**
```http
GET /api/analytics/system HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "accounts": {
      "total": 10,
      "active": 9,
      "inactive": 1
    },
    "activity": {
      "total_emails_sent": 150,
      "total_emails_received": 150,
      "total_interactions": 300,
      "total_replies": 95,
      "reply_ratio": 0.6333333333333333
    },
    "reputation": {
      "average": 48.52,
      "highest": 67.89,
      "lowest": 32.15
    }
  }
}
```

### Get Activity Statistics

**Request:**
```http
GET /api/analytics/activity-statistics HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "accounts": [
      {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "email": "alice@example.com",
        "is_active": true,
        "daily_limit": 8,
        "current_daily_count": 3,
        "total_sent": 15,
        "total_received": 12,
        "reputation_score": 45.67
      }
    ],
    "engagement": {
      "total_interactions": 300,
      "total_replies": 95,
      "reply_ratio": 0.6333333333333333
    },
    "distribution": {
      "total_active_accounts": 9,
      "total_interaction_patterns": 45,
      "avg_interactions_per_pair": 3.33,
      "top_patterns": [
        {
          "sender_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "receiver_id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
          "interaction_count": 5,
          "last_interaction_at": "2026-05-11T14:15:00.000Z"
        }
      ]
    },
    "summary": {
      "total_accounts": 10,
      "active_accounts": 9,
      "total_interactions": 300,
      "total_replies": 95,
      "reply_ratio": 0.6333333333333333
    }
  }
}
```

### Get Reputation Growth

**Request:**
```http
GET /api/analytics/reputation-growth HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "account_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "email": "alice@example.com",
      "current_reputation": 45.67,
      "history": [
        {
          "reputation_score": 30.25,
          "recorded_at": "2026-05-11T10:00:00.000Z"
        },
        {
          "reputation_score": 35.50,
          "recorded_at": "2026-05-11T11:00:00.000Z"
        },
        {
          "reputation_score": 42.15,
          "recorded_at": "2026-05-11T13:00:00.000Z"
        },
        {
          "reputation_score": 45.67,
          "recorded_at": "2026-05-11T14:20:00.000Z"
        }
      ]
    }
  ]
}
```

### Get Interaction Trends

**Request:**
```http
GET /api/analytics/interaction-trends?days=7 HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "period_days": 7,
    "trends": [
      {
        "date": "2026-05-11",
        "total_emails": 85,
        "total_replies": 32,
        "unique_senders": 9,
        "unique_receivers": 9
      },
      {
        "date": "2026-05-10",
        "total_emails": 72,
        "total_replies": 28,
        "unique_senders": 8,
        "unique_receivers": 8
      },
      {
        "date": "2026-05-09",
        "total_emails": 65,
        "total_replies": 25,
        "unique_senders": 8,
        "unique_receivers": 8
      }
    ]
  }
}
```

### Get Daily Statistics

**Request:**
```http
GET /api/analytics/daily-statistics?days=3 HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "stat-1",
      "date": "2026-05-11",
      "total_emails_sent": 85,
      "total_replies_generated": 32,
      "average_reputation": 48.52,
      "active_accounts": 9,
      "created_at": "2026-05-11T00:00:00.000Z"
    },
    {
      "id": "stat-2",
      "date": "2026-05-10",
      "total_emails_sent": 72,
      "total_replies_generated": 28,
      "average_reputation": 45.30,
      "active_accounts": 8,
      "created_at": "2026-05-10T00:00:00.000Z"
    }
  ]
}
```

---

## Logs APIs

### Get Email Logs

**Request:**
```http
GET /api/logs?limit=5&offset=0 HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "limit": 5,
  "offset": 0,
  "data": [
    {
      "id": "email-1",
      "sender_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "receiver_id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "subject": "Quick question about the project",
      "message": "Hi! I wanted to reach out regarding the upcoming project deadline. Would love to hear your thoughts on this.",
      "is_reply": 0,
      "parent_interaction_id": null,
      "engagement_type": "initial",
      "sent_at": "2026-05-11T14:20:00.000Z",
      "sender_email": "alice@example.com",
      "receiver_email": "bob@example.com"
    },
    {
      "id": "email-2",
      "sender_id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "receiver_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "subject": "Re: Quick question about the project",
      "message": "Thanks for reaching out! I'd be happy to discuss this further.",
      "is_reply": 1,
      "parent_interaction_id": "email-1",
      "engagement_type": "positive",
      "sent_at": "2026-05-11T14:25:00.000Z",
      "sender_email": "bob@example.com",
      "receiver_email": "alice@example.com"
    }
  ]
}
```

### Get Daily Activity

**Request:**
```http
GET /api/logs/daily-activity?date=2026-05-11 HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "date": "2026-05-11",
    "summary": {
      "date": "2026-05-11",
      "total_emails": 85,
      "total_replies": 32
    },
    "logs": [
      {
        "id": "email-1",
        "sender_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "receiver_id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        "subject": "Quick question about the project",
        "message": "Hi! I wanted to reach out regarding the upcoming project deadline.",
        "is_reply": 0,
        "parent_interaction_id": null,
        "engagement_type": "initial",
        "sent_at": "2026-05-11T14:20:00.000Z",
        "sender_email": "alice@example.com",
        "receiver_email": "bob@example.com"
      }
    ]
  }
}
```

### Get Engagement History

**Request:**
```http
GET /api/logs/engagement-history?account_id=a1b2c3d4-e5f6-7890-abcd-ef1234567890&limit=10 HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "account_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "summary": {
      "total_sent": 15,
      "total_received": 12,
      "replies_sent": 8,
      "replies_received": 6
    },
    "interactions": [
      {
        "id": "email-1",
        "sender_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "receiver_id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        "subject": "Quick question about the project",
        "message": "Hi! I wanted to reach out regarding the upcoming project deadline.",
        "is_reply": 0,
        "parent_interaction_id": null,
        "engagement_type": "initial",
        "sent_at": "2026-05-11T14:20:00.000Z",
        "sender_email": "alice@example.com",
        "receiver_email": "bob@example.com"
      }
    ]
  }
}
```

### Get Activity Logs

**Request:**
```http
GET /api/logs/activity-logs?limit=5 HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "log-1",
      "account_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "activity_type": "limit_increased",
      "details": "Daily limit increased to 8",
      "timestamp": "2026-05-11T14:00:00.000Z",
      "email": "alice@example.com"
    },
    {
      "id": "log-2",
      "account_id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "activity_type": "status_changed",
      "details": "Account enabled",
      "timestamp": "2026-05-11T13:30:00.000Z",
      "email": "bob@example.com"
    },
    {
      "id": "log-3",
      "account_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "activity_type": "account_created",
      "details": "Account created with email: alice@example.com",
      "timestamp": "2026-05-11T10:30:00.000Z",
      "email": "alice@example.com"
    }
  ]
}
```

### Get Interaction Details

**Request:**
```http
GET /api/logs/interaction/email-1 HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "interaction": {
      "id": "email-1",
      "sender_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "receiver_id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "subject": "Quick question about the project",
      "message": "Hi! I wanted to reach out regarding the upcoming project deadline. Would love to hear your thoughts on this.",
      "is_reply": 0,
      "parent_interaction_id": null,
      "engagement_type": "initial",
      "sent_at": "2026-05-11T14:20:00.000Z",
      "sender_email": "alice@example.com",
      "sender_name": "Alice Johnson",
      "receiver_email": "bob@example.com",
      "receiver_name": "Bob Smith"
    },
    "parent": null,
    "replies": [
      {
        "id": "email-2",
        "sender_id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        "receiver_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "subject": "Re: Quick question about the project",
        "message": "Thanks for reaching out! I'd be happy to discuss this further.",
        "is_reply": 1,
        "parent_interaction_id": "email-1",
        "engagement_type": "positive",
        "sent_at": "2026-05-11T14:25:00.000Z"
      }
    ]
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Email and name are required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Account not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "error": "Account with this email already exists"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to create account",
  "details": "Database connection error"
}
```
