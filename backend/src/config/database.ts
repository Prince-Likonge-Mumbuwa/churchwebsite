// src/config/database.ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create connection pool with Hostinger support
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    connectTimeout: 60000,
    // Remove ssl: false - not needed for Hostinger basic connection
    // Enable multiple statements if needed
    multipleStatements: false,
    // Date strings instead of Date objects
    dateStrings: true
});

// Database initialization - Create all tables
export const initDatabase = async (): Promise<void> => {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('📡 Connected to MySQL server');
        
        // Create users table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('admin', 'editor') DEFAULT 'editor',
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                last_login TIMESTAMP NULL,
                INDEX idx_email (email)
            )
        `);
        console.log('✅ Users table ready');
        
        // Create photo collections table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS photo_collections (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(200) NOT NULL,
                description TEXT,
                cover_photo_id INT NULL,
                created_by INT NOT NULL,
                is_published BOOLEAN DEFAULT TRUE,
                display_order INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
                INDEX idx_published (is_published),
                INDEX idx_order (display_order)
            )
        `);
        console.log('✅ Photo collections table ready');
        
        // Create photos table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS photos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                collection_id INT NOT NULL,
                title VARCHAR(200) NOT NULL,
                description TEXT,
                image_url LONGTEXT NOT NULL,
                image_size INT,
                mime_type VARCHAR(50),
                display_order INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (collection_id) REFERENCES photo_collections(id) ON DELETE CASCADE,
                INDEX idx_collection (collection_id),
                INDEX idx_order (display_order)
            )
        `);
        console.log('✅ Photos table ready');
        
        // Create videos table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS videos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(200) NOT NULL,
                description TEXT,
                category VARCHAR(100) NOT NULL,
                video_type ENUM('local', 'youtube', 'vimeo', 'facebook', 'other') DEFAULT 'youtube',
                video_url LONGTEXT NOT NULL,
                thumbnail_url TEXT,
                duration VARCHAR(20),
                views INT DEFAULT 0,
                video_size INT,
                created_by INT NOT NULL,
                is_published BOOLEAN DEFAULT TRUE,
                published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
                INDEX idx_category (category),
                INDEX idx_published (is_published),
                INDEX idx_type (video_type)
            )
        `);
        console.log('✅ Videos table ready');
        
        console.log('🎉 All database tables initialized successfully');
        
    } catch (error) {
        console.error('❌ Database initialization error:', error);
        throw error;
    } finally {
        if (connection) {
            connection.release();
            console.log('🔒 Database connection released');
        }
    }
};

// Test database connection
export const testConnection = async (): Promise<boolean> => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.ping();
        console.log('✅ Database connection successful');
        console.log(`📊 Connected to: ${process.env.DB_NAME} on ${process.env.DB_HOST}`);
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:');
        console.error(`   Host: ${process.env.DB_HOST}`);
        console.error(`   User: ${process.env.DB_USER}`);
        console.error(`   Database: ${process.env.DB_NAME}`);
        console.error(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return false;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

// Get pool status
export const getPoolStatus = () => {
    return {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        isConfigured: !!(process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME),
        connectionLimit: 10
    };
};

export default pool;