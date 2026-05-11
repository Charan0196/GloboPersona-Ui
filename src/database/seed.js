const database = require('./db');
const Account = require('../models/Account');

const sampleAccounts = [
    { email: 'alice@example.com', name: 'Alice Johnson' },
    { email: 'bob@example.com', name: 'Bob Smith' },
    { email: 'charlie@example.com', name: 'Charlie Brown' },
    { email: 'diana@example.com', name: 'Diana Prince' },
    { email: 'eve@example.com', name: 'Eve Wilson' },
    { email: 'frank@example.com', name: 'Frank Miller' },
    { email: 'grace@example.com', name: 'Grace Lee' },
    { email: 'henry@example.com', name: 'Henry Ford' },
    { email: 'iris@example.com', name: 'Iris West' },
    { email: 'jack@example.com', name: 'Jack Ryan' }
];

async function seed() {
    try {
        console.log('Starting database seeding...');
        
        await database.connect();
        
        console.log('Creating sample accounts...');
        
        for (const accountData of sampleAccounts) {
            try {
                // Check if account already exists
                const existing = await Account.findByEmail(accountData.email);
                
                if (existing) {
                    console.log(`  ⏭️  Account ${accountData.email} already exists, skipping...`);
                } else {
                    await Account.create(accountData.email, accountData.name);
                    console.log(`  ✅ Created account: ${accountData.email}`);
                }
            } catch (error) {
                console.error(`  ❌ Error creating account ${accountData.email}:`, error.message);
            }
        }
        
        console.log('\n✨ Database seeding completed!');
        console.log(`\nCreated ${sampleAccounts.length} sample accounts.`);
        console.log('\nYou can now:');
        console.log('  1. Start the server: npm start');
        console.log('  2. Start the activity engine: POST http://localhost:3000/api/activity/start');
        console.log('  3. Monitor activity: GET http://localhost:3000/api/analytics/system\n');
        
        await database.close();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

// Run seeding if called directly
if (require.main === module) {
    seed();
}

module.exports = seed;
