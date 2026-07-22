// src/routes/authRoutes.ts
import express from 'express';
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Auth routes are working!' });
});

export default router;