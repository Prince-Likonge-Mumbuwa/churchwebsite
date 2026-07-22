// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool, { initDatabase, testConnection } from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for image uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date(),
        message: 'Server is running'
    });
});

// Test database endpoint
app.get('/test-db', async (req, res) => {
    try {
        const connected = await testConnection();
        if (connected) {
            res.json({ success: true, message: 'Database connected successfully' });
        } else {
            res.status(500).json({ success: false, message: 'Database connection failed' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Database error', error });
    }
});

// Start server
const startServer = async () => {
    try {
        // Initialize database (creates tables)
        await initDatabase();
        
        // Test connection
        await testConnection();
        
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📁 Environment: ${process.env.NODE_ENV}`);
            console.log(`🔗 Health check: http://localhost:${PORT}/health`);
            console.log(`🗄️  DB Test: http://localhost:${PORT}/test-db`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();