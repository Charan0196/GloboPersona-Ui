-- Accounts Table
CREATE TABLE IF NOT EXISTS accounts (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    daily_limit INTEGER DEFAULT 5,
    current_daily_count INTEGER DEFAULT 0,
    total_sent INTEGER DEFAULT 0,
    total_received INTEGER DEFAULT 0,
    reputation_score REAL DEFAULT 0.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Email Interactions Table
CREATE TABLE IF NOT EXISTS email_interactions (
    id TEXT PRIMARY KEY,
    sender_id TEXT NOT NULL,
    receiver_id TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_reply INTEGER DEFAULT 0,
    parent_interaction_id TEXT,
    engagement_type TEXT DEFAULT 'positive',
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES accounts(id),
    FOREIGN KEY (receiver_id) REFERENCES accounts(id),
    FOREIGN KEY (parent_interaction_id) REFERENCES email_interactions(id)
);

-- Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
    id TEXT PRIMARY KEY,
    account_id TEXT NOT NULL,
    activity_type TEXT NOT NULL,
    details TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

-- Reputation History Table
CREATE TABLE IF NOT EXISTS reputation_history (
    id TEXT PRIMARY KEY,
    account_id TEXT NOT NULL,
    reputation_score REAL NOT NULL,
    positive_replies INTEGER DEFAULT 0,
    total_interactions INTEGER DEFAULT 0,
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

-- Activity Engine State Table
CREATE TABLE IF NOT EXISTS activity_engine_state (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    is_running INTEGER DEFAULT 0,
    last_run_at DATETIME,
    total_cycles INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Daily Activity Statistics Table
CREATE TABLE IF NOT EXISTS daily_statistics (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    total_emails_sent INTEGER DEFAULT 0,
    total_replies_generated INTEGER DEFAULT 0,
    average_reputation REAL DEFAULT 0.0,
    active_accounts INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sender-Receiver Mapping History (to avoid repetitive patterns)
CREATE TABLE IF NOT EXISTS interaction_patterns (
    id TEXT PRIMARY KEY,
    sender_id TEXT NOT NULL,
    receiver_id TEXT NOT NULL,
    interaction_count INTEGER DEFAULT 1,
    last_interaction_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES accounts(id),
    FOREIGN KEY (receiver_id) REFERENCES accounts(id),
    UNIQUE(sender_id, receiver_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_email_interactions_sender ON email_interactions(sender_id);
CREATE INDEX IF NOT EXISTS idx_email_interactions_receiver ON email_interactions(receiver_id);
CREATE INDEX IF NOT EXISTS idx_email_interactions_sent_at ON email_interactions(sent_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_account ON activity_logs(account_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_reputation_history_account ON reputation_history(account_id);
CREATE INDEX IF NOT EXISTS idx_interaction_patterns_sender ON interaction_patterns(sender_id);
CREATE INDEX IF NOT EXISTS idx_interaction_patterns_receiver ON interaction_patterns(receiver_id);
