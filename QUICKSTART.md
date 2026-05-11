# Quick Start Guide

Get the Email Engagement System up and running in 5 minutes!

## Prerequisites

- Node.js v14+ installed
- npm or yarn package manager

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

```bash
npm run migrate
```

This creates the SQLite database with all necessary tables.

### 3. Seed Sample Data (Optional but Recommended)

```bash
npm run seed
```

This creates 10 sample accounts for testing.

### 4. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

## Testing the System

### Option A: Using cURL

#### 1. Create Accounts (if you didn't run seed)

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

#### 2. Start the Activity Engine

```bash
curl -X POST http://localhost:3000/api/activity/start
```

#### 3. Watch the Magic Happen!

Check the server console - you'll see emails being sent and replies being generated every 5 minutes.

#### 4. View Statistics

```bash
# System overview
curl http://localhost:3000/api/analytics/system

# Recent email logs
curl http://localhost:3000/api/logs?limit=10

# Activity statistics
curl http://localhost:3000/api/analytics/activity-statistics
```

### Option B: Using Postman

1. Import `postman_collection.json` into Postman
2. Set the `base_url` variable to `http://localhost:3000/api`
3. Run the requests in order:
   - Create Account (repeat 3-5 times with different emails)
   - Start Activity Engine
   - Get System Analytics
   - Get Email Logs

## What to Expect

Once the activity engine is running:

1. **Every 5 minutes** (configurable), the system will:
   - Select sender-receiver pairs intelligently
   - Send simulated emails between accounts
   - Generate positive replies (70% probability)
   - Update reputation scores
   - Gradually increase daily limits (every 5 cycles)

2. **You can monitor**:
   - Real-time activity in the server console
   - Email logs via `/api/logs`
   - Statistics via `/api/analytics/*`
   - Account details via `/api/accounts`

3. **Expected behavior**:
   - Accounts start with 5 emails/day limit
   - Limits increase by 1-5 emails every 5 cycles
   - Emails are distributed to avoid repetitive patterns
   - Replies are generated automatically
   - Reputation scores improve with engagement

## Common Commands

```bash
# View all accounts
curl http://localhost:3000/api/accounts

# Check engine status
curl http://localhost:3000/api/activity/status

# Pause engine
curl -X POST http://localhost:3000/api/activity/pause

# Resume engine
curl -X POST http://localhost:3000/api/activity/resume

# Run a single cycle manually
curl -X POST http://localhost:3000/api/activity/run-cycle

# View today's activity
curl "http://localhost:3000/api/logs/daily-activity?date=$(date +%Y-%m-%d)"

# View reputation growth
curl http://localhost:3000/api/analytics/reputation-growth
```

## Troubleshooting

### No emails being sent?

- Check that accounts are created: `curl http://localhost:3000/api/accounts`
- Verify engine is running: `curl http://localhost:3000/api/activity/status`
- Check server console for errors

### Want faster activity?

Edit `.env` and change:
```env
ACTIVITY_CRON_SCHEDULE=*/1 * * * *  # Run every minute
```

Then restart the server.

### Reset everything?

```bash
rm database.sqlite
npm run migrate
npm run seed
npm start
```

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [API_EXAMPLES.md](API_EXAMPLES.md) for request/response examples
- Explore the code in `src/` directory
- Customize configuration in `.env`

## Configuration Tips

### Increase Activity

```env
INITIAL_DAILY_LIMIT=10
MAX_DAILY_LIMIT=200
MIN_INCREMENT=2
MAX_INCREMENT=10
ACTIVITY_CRON_SCHEDULE=*/2 * * * *
```

### More Replies

```env
REPLY_GENERATION_PROBABILITY=0.9  # 90% reply rate
```

### Different Increment Patterns

```env
ACTIVITY_INCREMENT_TYPE=odd      # Use odd numbers (1,3,5,7,9)
ACTIVITY_INCREMENT_TYPE=even     # Use even numbers (2,4,6,8)
ACTIVITY_INCREMENT_TYPE=randomized  # Random between min and max
```

## Support

If you encounter issues:

1. Check the server console for error messages
2. Verify Node.js version: `node --version` (should be v14+)
3. Ensure port 3000 is available
4. Review the logs in the console

Happy testing! 🚀
