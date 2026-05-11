const fs = require('fs');
const path = require('path');
const database = require('./db');

async function migrate() {
    try {
        console.log('Starting database migration...');
        
        await database.connect();
        
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        // Split by semicolon and execute each statement
        const statements = schema
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);
        
        for (const statement of statements) {
            await database.run(statement);
        }
        
        // Initialize activity engine state
        await database.run(`
            INSERT OR IGNORE INTO activity_engine_state (id, is_running, total_cycles)
            VALUES (1, 0, 0)
        `);
        
        console.log('Database migration completed successfully!');
        
        await database.close();
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

// Run migration if called directly
if (require.main === module) {
    migrate();
}

module.exports = migrate;
