import dotenv from 'dotenv';
import { testConnection } from './config/database';

dotenv.config();

async function runTests() {
    console.log('\n🔍 TESTING HOSTINGER DATABASE CONNECTION\n');
    console.log('Current Configuration:');
    console.log(`- DB_HOST: ${process.env.DB_HOST}`);
    console.log(`- DB_USER: ${process.env.DB_USER}`);
    console.log(`- DB_NAME: ${process.env.DB_NAME}`);
    console.log(`- DB_PASSWORD: ${process.env.DB_PASSWORD ? '✓ Set' : '✗ Missing'}`);
    console.log('');

    // Check if using localhost
    if (process.env.DB_HOST === 'localhost' || process.env.DB_HOST === '127.0.0.1') {
        console.error('❌ ERROR: DB_HOST is set to localhost!');
        console.log('Please update your .env file with the Hostinger database IP address\n');
        return;
    }

    // Test connection
    const isConnected = await testConnection();
    
    if (isConnected) {
        console.log('\n✓ Connection test passed!');
        console.log('\n🎉 Database is ready to use!\n');
    } else {
        console.log('\n✗ Connection test failed!');
        console.log('\nTroubleshooting steps:');
        console.log('1. Enable Remote MySQL in Hostinger control panel');
        console.log('2. Add your IP address to Remote MySQL allow list');
        console.log('3. Verify database credentials are correct');
        console.log('4. Check if the database exists in Hostinger\n');
    }
}

runTests();