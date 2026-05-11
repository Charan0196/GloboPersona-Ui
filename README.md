# Email Engagement & Activity Distribution System

A scalable backend system that simulates realistic email communication patterns by automating email interactions between multiple accounts with intelligent distribution and progressive activity scaling.

## 🎯 Overview

This system automates email engagement simulation with the following key features:

- **Progressive Activity Scaling**: Gradually increases email sending limits over time
- **Intelligent Distribution**: Dynamically distributes emails between accounts avoiding repetitive patterns
- **Positive Engagement Simulation**: Automatically generates realistic replies and conversations
- **Reputation Tracking**: Monitors and tracks account reputation based on engagement quality
- **Comprehensive Analytics**: Provides detailed insights into activity patterns and trends

## 🏗️ Architecture

### Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3
- **Scheduling**: node-cron
- **Language**: JavaScript

### System Components

1. **Account Management**: Create and manage email accounts with activity limits
2. **Distribution Engine**: Intelligently pairs senders and receivers avoiding repetitive patterns
3. **Activity Engine**: Automated scheduler that runs email cycles and generates replies
4. **Content Generator**: Creates realistic email subjects and messages
5. **Analytics Engine**: Tracks reputation, engagement, and activity statistics
6. **REST API**: Comprehensive API for system control and data access

## 📁 Project Structure

```
email-engagement-system/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── accountController.js
│   │   ├── activityController.js
│   │   ├── analyticsController.js
│   │   └── logsController.js
│   ├── models/              # Data models
│   │   ├── Account.js
│   │   └── EmailInteraction.js
│   ├── services/            # Business logic
│   │   ├── ActivityEngine.js
│   │   ├── DistributionEngine.js
│   │   └── ContentGenerator.js
│   ├── routes/              # API routes
│   │   ├── accounts.js
│   │   ├── activity.js
│   │   ├── analytics.js
│   │   └── logs.js
│   ├── database/            # Database setup
│   │   ├── db.js
│   │   ├── migrate.js
│   │   └── schema.sql
│   └── server.js            # Application entry point
├── .env                     # Environment configuration
├── .env.example            # Environment template
├── package.json            # Dependencies
└── README.md              # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd email-engagement-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your preferred settings
```

4. **Run database migration**
```bash
npm run migrate
```

5. **Start the server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## 📊 Database Schema

### Tables

- **accounts**: Email account information and activity limits
- **email_interactions**: All email communications and replies
- **activity_logs**: System activity events
- **reputation_history**: Historical reputation scores
- **activity_engine_state**: Engine status and cycle tracking
- **daily_statistics**: Aggregated daily metrics
- **interaction_patterns**: Sender-receiver interaction tracking

## 🔌 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Account APIs

#### Create Account
```http
POST /api/accounts
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe"
}
```

#### Get All Accounts
```http
GET /api/accounts
```

#### Get Account Details
```http
GET /api/accounts/:id
```

#### Get Account Statistics
```http
GET /api/accounts/:id/statistics
```

#### Enable Account
```http
PATCH /api/accounts/:id/enable
```

#### Disable Account
```http
PATCH /api/accounts/:id/disable
```

### Activity APIs

#### Start Activity Engine
```http
POST /api/activity/start
```

#### Pause Activity Engine
```http
POST /api/activity/pause
```

#### Resume Activity Engine
```http
POST /api/activity/resume
```

#### Get Engine Status
```http
GET /api/activity/status
```

#### Run Manual Cycle
```http
POST /api/activity/run-cycle
```

### Analytics APIs

#### Get Reputation Growth
```http
GET /api/analytics/reputation-growth
```

#### Get Activity Statistics
```http
GET /api/analytics/activity-statistics
```

#### Get Interaction Trends
```http
GET /api/analytics/interaction-trends?days=7
```

#### Get Daily Statistics
```http
GET /api/analytics/daily-statistics?days=7
```

#### Get System Analytics
```http
GET /api/analytics/system
```

### Logs APIs

#### Get Email Logs
```http
GET /api/logs?limit=50&offset=0&account_id=<optional>
```

#### Get Daily Activity
```http
GET /api/logs/daily-activity?date=2026-05-11
```

#### Get Engagement History
```http
GET /api/logs/engagement-history?account_id=<id>&limit=50
```

#### Get Activity Logs
```http
GET /api/logs/activity-logs?limit=100&account_id=<optional>
```

#### Get Interaction Details
```http
GET /api/logs/interaction/:id
```

## 🎮 Usage Example

### 1. Create Accounts

```bash
curl -X POST http://localhost:3000/api/accounts \
  -H "Content-Type: application/json" \
  -d '{"email": "alice@example.com", "name": "Alice"}'

curl -X POST http://localhost:3000/api/accounts \
  -H "Content-Type: application/json" \
  -d '{"email": "bob@example.com", "name": "Bob"}'

curl -X POST http://localhost:3000/api/accounts \
  -H "Content-Type: application/json" \
  -d '{"email": "charlie@example.com", "name": "Charlie"}'
```

### 2. Start Activity Engine

```bash
curl -X POST http://localhost:3000/api/activity/start
```

### 3. Monitor Activity

```bash
# Check engine status
curl http://localhost:3000/api/activity/status

# View activity statistics
curl http://localhost:3000/api/analytics/activity-statistics

# View recent logs
curl http://localhost:3000/api/logs?limit=20
```

### 4. View Analytics

```bash
# System overview
curl http://localhost:3000/api/analytics/system

# Reputation growth
curl http://localhost:3000/api/analytics/reputation-growth

# Interaction trends
curl http://localhost:3000/api/analytics/interaction-trends?days=7
```

## 🧠 How It Works

### Activity Distribution Algorithm

1. **Account Selection**: Identifies active accounts that haven't reached daily limits
2. **Intelligent Pairing**: Selects sender-receiver pairs based on:
   - Interaction history (prefers less frequent pairs)
   - Random factors (adds unpredictability)
   - Balance considerations (avoids overuse of specific accounts)
3. **Pattern Avoidance**: Tracks interaction patterns to prevent repetitive communication loops

### Progressive Activity Scaling

- Accounts start with a low daily limit (default: 5 emails)
- Limits gradually increase based on configured increment type:
  - **Randomized**: Random increment between min and max
  - **Odd**: Increases by odd numbers (1, 3, 5, 7, 9)
  - **Even**: Increases by even numbers (2, 4, 6, 8)
- Maximum limit prevents unlimited growth (default: 100)

### Reply Generation

- Automatically generates positive replies to unreplied emails
- Configurable reply probability (default: 70%)
- Creates realistic conversation threads
- Maintains parent-child relationships between emails

### Reputation Scoring

Reputation is calculated based on:
- **Reply Rate** (40% weight): Percentage of sent emails that receive replies
- **Balance Factor** (30% weight): Ratio of sent to received emails
- **Engagement Score** (30% weight): Overall participation in conversations

Score ranges from 0-100, with higher scores indicating better engagement quality.

## ⚙️ Configuration

### Environment Variables

```env
# Server Configuration
PORT=3000
NODE_ENV=development
DB_PATH=./database.sqlite

# Activity Engine Configuration
INITIAL_DAILY_LIMIT=5          # Starting email limit per account
MAX_DAILY_LIMIT=100            # Maximum email limit per account
ACTIVITY_INCREMENT_TYPE=randomized  # odd, even, or randomized
MIN_INCREMENT=1                # Minimum increment value
MAX_INCREMENT=5                # Maximum increment value

# Scheduling Configuration
ACTIVITY_CRON_SCHEDULE=*/5 * * * *  # Run every 5 minutes
REPLY_GENERATION_PROBABILITY=0.7    # 70% chance to generate reply
```

### Cron Schedule Format

The `ACTIVITY_CRON_SCHEDULE` uses standard cron syntax:
```
* * * * *
│ │ │ │ │
│ │ │ │ └─── Day of week (0-7, 0 and 7 are Sunday)
│ │ │ └───── Month (1-12)
│ │ └─────── Day of month (1-31)
│ └───────── Hour (0-23)
└─────────── Minute (0-59)
```

Examples:
- `*/5 * * * *` - Every 5 minutes
- `0 * * * *` - Every hour
- `0 9 * * *` - Every day at 9 AM
- `*/15 9-17 * * 1-5` - Every 15 minutes, 9 AM to 5 PM, Monday to Friday

## 🔍 Key Features Explained

### 1. Intelligent Distribution

The system avoids repetitive patterns by:
- Tracking all sender-receiver interactions
- Scoring potential pairs based on interaction history
- Adding randomness to prevent predictability
- Shuffling account order in each cycle
- Balancing incoming and outgoing activity

### 2. Realistic Content Generation

- 20+ email subject templates
- 20+ message templates with dynamic topics
- 20+ positive reply templates
- Follow-up message generation
- Natural conversation flow

### 3. Comprehensive Logging

Every action is logged:
- Account creation and status changes
- Email sends and receives
- Reputation updates
- Activity limit increases
- Engine state changes

### 4. Analytics & Insights

Track key metrics:
- Total interactions and reply rates
- Account reputation scores over time
- Daily activity trends
- Distribution patterns
- Engagement quality

## 🧪 Testing the System

### Manual Testing

1. Create multiple accounts (at least 3-5 for best results)
2. Start the activity engine
3. Monitor logs to see email exchanges
4. Check analytics to view reputation growth
5. Observe how daily limits increase over time

### Verify Distribution Intelligence

```bash
# Check interaction patterns
curl http://localhost:3000/api/analytics/activity-statistics

# Look at the "distribution" section to see:
# - Total interaction patterns
# - Average interactions per pair
# - Top patterns (should be relatively balanced)
```

## 📈 Performance Considerations

- **Database**: SQLite is suitable for development and moderate loads
- **Scaling**: For production, consider PostgreSQL or MySQL
- **Cron Frequency**: Adjust based on desired activity level
- **Account Count**: System handles 100+ accounts efficiently
- **Concurrent Operations**: Activity cycles run sequentially to maintain consistency

## 🛠️ Troubleshooting

### Database Issues

```bash
# Reset database
rm database.sqlite
npm run migrate
```

### Engine Not Running

```bash
# Check status
curl http://localhost:3000/api/activity/status

# Restart engine
curl -X POST http://localhost:3000/api/activity/pause
curl -X POST http://localhost:3000/api/activity/start
```

### No Activity Generated

- Ensure accounts are created and active
- Check that accounts haven't reached daily limits
- Verify cron schedule is valid
- Check server logs for errors

## 📝 API Response Format

All API responses follow this structure:

### Success Response
```json
{
  "success": true,
  "message": "Optional message",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": "Optional detailed error info"
}
```

## 🎥 Code Walkthrough Video

[Loom Video Link - To be added after recording]

The video covers:
- System architecture and design decisions
- Activity distribution algorithm walkthrough
- Key API endpoints demonstration
- Database schema explanation
- Scheduling and automation logic
- Challenges faced and solutions implemented

## 🚧 Future Enhancements

Potential improvements:
- Web dashboard for visualization
- Email template customization
- Advanced scheduling rules
- Account groups and categories
- Export functionality for reports
- Webhook notifications
- Rate limiting per account
- Time-based activity patterns (business hours simulation)

## 📄 License

MIT License - Feel free to use this project for learning and development purposes.

## 👤 Author

Created as part of the Backend Developer Assessment for Globopersona

## 🙏 Acknowledgments

This project demonstrates:
- Scalable backend architecture
- Intelligent algorithm design
- RESTful API best practices
- Database design and optimization
- Automated scheduling systems
- Analytics and reporting capabilities

---

**Note**: This is a simulation system. No real emails are sent. All activity is internal to the application.
