# System Architecture

## Overview

The Email Engagement & Activity Distribution System is built using a layered architecture pattern with clear separation of concerns. The system simulates realistic email communication patterns through intelligent distribution algorithms and automated scheduling.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        REST API Layer                        │
│  (Express.js Routes + Controllers)                          │
│  - Account Management                                        │
│  - Activity Control                                          │
│  - Analytics & Reporting                                     │
│  - Logs & History                                           │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────────┐
│                    Business Logic Layer                      │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │ Activity Engine  │  │ Distribution     │               │
│  │ - Scheduling     │  │ Engine           │               │
│  │ - Cycle Mgmt     │  │ - Pairing Logic  │               │
│  │ - Reply Gen      │  │ - Pattern Track  │               │
│  └──────────────────┘  └──────────────────┘               │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │ Content          │  │ Reputation       │               │
│  │ Generator        │  │ Calculator       │               │
│  │ - Subjects       │  │ - Scoring        │               │
│  │ - Messages       │  │ - Tracking       │               │
│  └──────────────────┘  └──────────────────┘               │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────────┐
│                      Data Access Layer                       │
│  (Models)                                                    │
│  - Account Model                                             │
│  - EmailInteraction Model                                    │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────────┐
│                      Database Layer                          │
│  (SQLite)                                                    │
│  - accounts                                                  │
│  - email_interactions                                        │
│  - activity_logs                                            │
│  - reputation_history                                        │
│  - interaction_patterns                                      │
│  - daily_statistics                                         │
│  - activity_engine_state                                    │
└──────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. REST API Layer

**Purpose**: Handles HTTP requests and responses

**Components**:
- **Routes**: Define API endpoints and map to controllers
- **Controllers**: Handle request validation, call business logic, format responses
- **Middleware**: CORS, JSON parsing, request logging, error handling

**Key Files**:
- `src/routes/*.js` - Route definitions
- `src/controllers/*.js` - Request handlers
- `src/server.js` - Express app setup

### 2. Business Logic Layer

#### Activity Engine (`src/services/ActivityEngine.js`)

**Responsibilities**:
- Schedule automated activity cycles using cron
- Orchestrate email sending and reply generation
- Manage engine state (running/paused)
- Update daily statistics
- Coordinate with other services

**Key Methods**:
- `start()` - Starts the automated engine
- `pause()` - Pauses the engine
- `runCycle()` - Executes a single activity cycle
- `sendEmails()` - Sends emails based on distribution
- `generateReplies()` - Creates positive replies

**Design Pattern**: Singleton

#### Distribution Engine (`src/services/DistributionEngine.js`)

**Responsibilities**:
- Intelligently pair senders and receivers
- Avoid repetitive communication patterns
- Balance activity across accounts
- Calculate reputation scores
- Manage activity scaling

**Key Algorithms**:

1. **Sender-Receiver Pairing**:
   ```
   FOR each eligible sender:
     - Get all potential receivers
     - Score each receiver based on:
       * Interaction history (lower = better)
       * Random factor (adds unpredictability)
     - Select from top 3 candidates randomly
     - Add pair to list
   ```

2. **Activity Scaling**:
   ```
   FOR each active account:
     IF daily_limit < max_limit:
       - Calculate increment based on type:
         * odd: 1, 3, 5, 7, 9
         * even: 2, 4, 6, 8
         * randomized: random(min, max)
       - Increase daily_limit by increment
   ```

3. **Reputation Calculation**:
   ```
   reputation = (
     reply_rate * 40% +
     balance_factor * 30% +
     engagement_score * 30%
   ) * 100
   
   Where:
   - reply_rate = replies_received / emails_sent
   - balance_factor = min(sent, received) / max(sent, received)
   - engagement_score = (replies_sent + replies_received) / total_interactions
   ```

#### Content Generator (`src/services/ContentGenerator.js`)

**Responsibilities**:
- Generate realistic email subjects
- Create varied message content
- Produce positive reply messages
- Maintain natural conversation flow

**Design Pattern**: Static utility class

### 3. Data Access Layer

#### Account Model (`src/models/Account.js`)

**Responsibilities**:
- CRUD operations for accounts
- Activity limit management
- Reputation tracking
- Status management (enable/disable)

**Key Methods**:
- `create()` - Create new account
- `findById()`, `findByEmail()` - Retrieve accounts
- `updateStatus()` - Enable/disable account
- `incrementDailyLimit()` - Increase sending limit
- `canSendEmail()` - Check if account can send

#### EmailInteraction Model (`src/models/EmailInteraction.js`)

**Responsibilities**:
- Store email communications
- Track replies and conversations
- Maintain interaction patterns
- Generate engagement statistics

**Key Methods**:
- `create()` - Record new interaction
- `findUnrepliedInteractions()` - Get emails needing replies
- `getEngagementStats()` - Calculate engagement metrics
- `updateInteractionPattern()` - Track sender-receiver patterns

### 4. Database Layer

**Technology**: SQLite3

**Schema Design**:

```sql
accounts
├── id (PK)
├── email (UNIQUE)
├── name
├── is_active
├── daily_limit
├── current_daily_count
├── total_sent
├── total_received
├── reputation_score
└── timestamps

email_interactions
├── id (PK)
├── sender_id (FK → accounts)
├── receiver_id (FK → accounts)
├── subject
├── message
├── is_reply
├── parent_interaction_id (FK → email_interactions)
├── engagement_type
└── sent_at

interaction_patterns
├── id (PK)
├── sender_id (FK → accounts)
├── receiver_id (FK → accounts)
├── interaction_count
└── last_interaction_at

reputation_history
├── id (PK)
├── account_id (FK → accounts)
├── reputation_score
└── recorded_at

activity_logs
├── id (PK)
├── account_id (FK → accounts)
├── activity_type
├── details
└── timestamp

daily_statistics
├── id (PK)
├── date
├── total_emails_sent
├── total_replies_generated
├── average_reputation
├── active_accounts
└── created_at

activity_engine_state
├── id (PK, always 1)
├── is_running
├── last_run_at
├── total_cycles
└── timestamps
```

## Data Flow

### Email Sending Flow

```
1. Activity Engine triggers cycle
   ↓
2. Distribution Engine selects sender-receiver pairs
   ↓
3. Content Generator creates subject and message
   ↓
4. EmailInteraction.create() stores the email
   ↓
5. Account counters updated (sent/received)
   ↓
6. Interaction pattern recorded
   ↓
7. Activity logged
```

### Reply Generation Flow

```
1. Activity Engine requests unreplied emails
   ↓
2. EmailInteraction.findUnrepliedInteractions()
   ↓
3. For each email (with probability):
   ↓
4. Check if receiver can send (daily limit)
   ↓
5. Content Generator creates reply
   ↓
6. EmailInteraction.create() with parent_id
   ↓
7. Account counters updated
   ↓
8. Interaction pattern updated
```

### Reputation Update Flow

```
1. Activity Engine triggers reputation update
   ↓
2. For each account:
   ↓
3. Distribution Engine calculates metrics:
   - Reply rate
   - Balance factor
   - Engagement score
   ↓
4. Compute weighted reputation score
   ↓
5. Account.updateReputation()
   ↓
6. Store in reputation_history
```

## Design Patterns Used

### 1. Singleton Pattern
- **Where**: ActivityEngine, Database connection
- **Why**: Single instance manages state and connections

### 2. Repository Pattern
- **Where**: Account and EmailInteraction models
- **Why**: Abstracts data access, makes testing easier

### 3. Service Layer Pattern
- **Where**: ActivityEngine, DistributionEngine, ContentGenerator
- **Why**: Separates business logic from data access

### 4. Factory Pattern
- **Where**: Content generation
- **Why**: Creates varied content from templates

### 5. Strategy Pattern
- **Where**: Activity increment types (odd/even/randomized)
- **Why**: Different algorithms for activity scaling

## Scalability Considerations

### Current Design (SQLite)
- **Suitable for**: Development, testing, small deployments
- **Limitations**: Single-file database, limited concurrency
- **Max recommended**: ~100 accounts, ~10,000 interactions

### Scaling to Production

#### Database Migration
```
SQLite → PostgreSQL/MySQL
- Better concurrency
- Connection pooling
- Advanced indexing
- Replication support
```

#### Horizontal Scaling
```
1. Separate API servers (stateless)
2. Shared database
3. Load balancer
4. Redis for session/cache
5. Message queue for async tasks
```

#### Microservices Architecture
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Account   │  │  Activity   │  │  Analytics  │
│   Service   │  │   Service   │  │   Service   │
└─────────────┘  └─────────────┘  └─────────────┘
       │                │                │
       └────────────────┴────────────────┘
                        │
                  ┌─────┴─────┐
                  │  Message  │
                  │   Queue   │
                  └───────────┘
```

## Performance Optimizations

### Database Indexes
- Sender/receiver IDs on email_interactions
- Account ID on activity_logs
- Date fields for time-based queries
- Composite indexes on interaction_patterns

### Query Optimization
- Limit result sets
- Use pagination
- Aggregate at database level
- Cache frequently accessed data

### Cron Scheduling
- Configurable frequency
- Batch processing
- Async operations
- Error recovery

## Security Considerations

### Current Implementation
- Input validation in controllers
- SQL injection prevention (parameterized queries)
- CORS enabled
- Error message sanitization

### Production Recommendations
- Add authentication (JWT)
- Rate limiting
- API key management
- HTTPS only
- Input sanitization
- SQL injection protection
- XSS prevention
- CSRF tokens

## Monitoring & Observability

### Current Logging
- Console logging for activity
- Database activity logs
- Error tracking

### Production Recommendations
- Structured logging (Winston, Bunyan)
- Log aggregation (ELK stack)
- Metrics (Prometheus)
- Tracing (Jaeger)
- Health checks
- Performance monitoring

## Testing Strategy

### Unit Tests
- Model methods
- Service logic
- Utility functions

### Integration Tests
- API endpoints
- Database operations
- Service interactions

### End-to-End Tests
- Complete workflows
- Activity cycles
- Data consistency

## Deployment Architecture

### Development
```
Local Machine
├── Node.js server
├── SQLite database
└── Console monitoring
```

### Production (Recommended)
```
┌─────────────────┐
│  Load Balancer  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───┴───┐ ┌──┴────┐
│ API 1 │ │ API 2 │
└───┬───┘ └──┬────┘
    │        │
    └────┬───┘
         │
┌────────┴────────┐
│   PostgreSQL    │
│   (Primary)     │
└────────┬────────┘
         │
┌────────┴────────┐
│   PostgreSQL    │
│   (Replica)     │
└─────────────────┘
```

## Configuration Management

### Environment Variables
- Server configuration (PORT, NODE_ENV)
- Database settings
- Activity engine parameters
- Scheduling configuration

### Configuration Files
- `.env` for environment-specific settings
- `package.json` for dependencies
- Database schema in SQL files

## Error Handling

### Strategy
1. Try-catch blocks in async operations
2. Validation at API layer
3. Database constraint enforcement
4. Graceful degradation
5. Error logging
6. User-friendly error messages

### Error Types
- Validation errors (400)
- Not found errors (404)
- Conflict errors (409)
- Server errors (500)

## Future Enhancements

### Short Term
- Web dashboard
- Real-time updates (WebSockets)
- Export functionality
- Advanced filtering

### Long Term
- Machine learning for content generation
- Predictive analytics
- Multi-tenant support
- Plugin architecture
- GraphQL API

## Conclusion

The system is designed with:
- **Modularity**: Clear separation of concerns
- **Scalability**: Easy to scale horizontally
- **Maintainability**: Well-organized code structure
- **Extensibility**: Easy to add new features
- **Testability**: Isolated components for testing
