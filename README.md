# Globopersona - Email Marketing Platform UI Redesign

A modern, clean, and highly usable redesign of the Globopersona email marketing and automation platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

**Deployed Application**: [https://globopersona-ui-six.vercel.app](https://globopersona-ui-six.vercel.app)

**GitHub Repository**: [https://github.com/Charan0196/GloboPersona-Ui](https://github.com/Charan0196/GloboPersona-Ui)

## 🎯 Project Overview

This project is a frontend UI redesign assessment that transforms the existing Globopersona interface into a modern, professional, and user-friendly application. The redesign focuses on:

- **Visual Design Quality**: Improved spacing, typography, colors, and consistency
- **UX Clarity**: Intuitive flows and easy-to-understand interfaces
- **Component Reusability**: Well-structured, reusable UI components
- **Responsiveness**: Desktop-first design that works on all screen sizes
- **Modern Stack**: Built with Next.js 14 App Router, TypeScript, and Tailwind CSS

## ✨ Features

### Implemented Pages

1. **Dashboard** (`/`)
   - Overview statistics with key metrics
   - Recent campaigns with performance data
   - Quick actions sidebar
   - System status monitoring

2. **Campaigns** (`/campaigns`)
   - Campaign list with grid and table views
   - Filtering and search functionality
   - Campaign statistics and metrics
   - Status badges and type indicators

3. **Campaign Creation** (`/campaigns/create`)
   - Multi-step campaign creation wizard
   - Progress tracking
   - AI vs Standard content selection
   - Campaign preview sidebar

4. **Email Lists** (`/email-lists`)
   - Email list management
   - Contact statistics
   - Quality indicators
   - Quick actions for segments and campaigns

5. **Email Accounts** (`/email-accounts`)
   - Email account configuration
   - SMTP/IMAP settings display
   - Usage tracking and limits
   - Account status monitoring

6. **Contacts** (`/contacts`)
   - Contact management interface (placeholder)

7. **Analytics** (`/analytics`)
   - Analytics dashboard (placeholder)

### Design Improvements

#### Visual Hierarchy
- Clear typography scale with consistent font weights
- Proper heading hierarchy (h1, h2, h3)
- Strategic use of color to guide attention
- Improved spacing and whitespace

#### Spacing & Alignment
- Consistent padding and margins using Tailwind's spacing scale
- Proper alignment of elements
- Grid-based layouts for consistency
- Responsive spacing that adapts to screen size

#### Typography
- Inter font family for modern, clean look
- Consistent font sizes across components
- Proper line heights for readability
- Font weight variations for hierarchy

#### Color Usage
- Primary purple color scheme (#8b5cf6)
- Semantic colors for status (green for success, red for error, etc.)
- Proper contrast ratios for accessibility
- Subtle gradients for visual interest

#### Component Consistency
- Reusable Button component with variants
- Consistent Card components
- Standardized Input fields
- Uniform Badge styling
- Cohesive StatCard design

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## 📦 Project Structure

```
globopersona-ui/
├── app/
│   ├── campaigns/
│   │   ├── create/
│   │   │   └── page.tsx          # Campaign creation wizard
│   │   └── page.tsx               # Campaigns list
│   ├── email-lists/
│   │   └── page.tsx               # Email lists management
│   ├── email-accounts/
│   │   └── page.tsx               # Email accounts configuration
│   ├── contacts/
│   │   └── page.tsx               # Contacts management
│   ├── analytics/
│   │   └── page.tsx               # Analytics dashboard
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Dashboard home
│   └── globals.css                # Global styles
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.tsx   # Main layout wrapper
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   └── Header.tsx            # Page header component
│   └── ui/
│       ├── Button.tsx            # Reusable button component
│       ├── Card.tsx              # Card component with variants
│       ├── Input.tsx             # Form input component
│       ├── Badge.tsx             # Status badge component
│       └── StatCard.tsx          # Statistics card component
├── public/                        # Static assets
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── postcss.config.mjs            # PostCSS configuration
├── next.config.mjs               # Next.js configuration
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd globopersona-ui
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design Decisions

### Color Palette
- **Primary**: Purple (#8b5cf6) - Modern, professional, and associated with creativity
- **Success**: Green - Positive actions and completed states
- **Warning**: Yellow - Attention-needed items
- **Error**: Red - Errors and destructive actions
- **Info**: Blue - Informational content

### Layout Structure
- **Fixed Sidebar**: 256px width for consistent navigation
- **Sticky Header**: Always visible for context and actions
- **Content Area**: Responsive with max-width constraints for readability
- **Card-Based Design**: Modular content organization

### Component Design Philosophy
1. **Consistency**: All components follow the same design language
2. **Flexibility**: Props-based customization for different use cases
3. **Accessibility**: Proper ARIA labels and keyboard navigation
4. **Performance**: Optimized re-renders and lazy loading where appropriate

### Interaction States
- **Hover**: Subtle background color changes and shadows
- **Active**: Clear visual feedback for clicked elements
- **Disabled**: Reduced opacity and cursor changes
- **Focus**: Visible focus rings for keyboard navigation

## 📱 Responsive Design

The application is built with a desktop-first approach but remains fully functional on smaller screens:

- **Desktop** (1024px+): Full layout with sidebar and multi-column grids
- **Tablet** (768px-1023px): Adjusted grid columns and spacing
- **Mobile** (< 768px): Single column layout with collapsible navigation

## 🔄 Data Structure

The application uses mock data with the following structure:

### Campaign
```typescript
{
  id: number;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'completed';
  type: string;
  recipients: number;
  openRate: number;
  clickRate: number;
  sent: number;
  opened: number;
  clicked: number;
  createdAt: string;
}
```

### Email List
```typescript
{
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  quality: 'poor' | 'good' | 'excellent';
  contacts: number;
  validContacts: number;
  openRate: number;
  clickRate: number;
  createdAt: string;
}
```

## 🎯 Key Improvements from Original UI

1. **Visual Consistency**: Unified color scheme and component styling
2. **Better Spacing**: Improved whitespace and element spacing
3. **Clear Hierarchy**: Better visual hierarchy with typography and colors
4. **Modern Components**: Updated buttons, cards, and form elements
5. **Enhanced Navigation**: Clearer sidebar with active states
6. **Improved Stats Display**: More readable statistics cards
7. **Better Status Indicators**: Clear badges for different states
8. **Responsive Grid Layouts**: Flexible layouts that adapt to screen size
9. **Hover States**: Interactive feedback on all clickable elements
10. **Loading States**: Visual feedback for user actions

## 🚧 Future Enhancements

- Connect to real backend API
- Add authentication and user management
- Implement real-time updates
- Add data visualization charts
- Implement advanced filtering and sorting
- Add email template editor
- Implement drag-and-drop functionality
- Add dark mode support
- Implement internationalization (i18n)
- Add comprehensive unit and integration tests

## 📝 Notes

- This is a demo UI with mock data
- No backend connection is implemented
- All data is static and for demonstration purposes
- Focus is on UI/UX design and component architecture

## 👨‍💻 Development

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Tailwind CSS for styling
- Component-based architecture
- Clear naming conventions

### Best Practices
- Reusable components
- Proper TypeScript typing
- Responsive design patterns
- Accessibility considerations
- Clean code structure

## 📄 License

This project is created as part of a frontend assessment for Globopersona.

## 🤝 Contact

For questions or feedback about this project, please reach out through the assessment submission process.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**│   │   ├── accountController.js
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
