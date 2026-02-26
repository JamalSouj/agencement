const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db');
const { generateToken, verifyToken } = require('../auth');

// Login Endpoint
router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = bcrypt.compareSync(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.json({ message: 'Login successful', token, username: user.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Verify token endpoint (Useful for checking if logged in on frontend load)
router.get('/verify', verifyToken, (req, res) => {
    res.json({ message: 'Token is valid', user: req.user });
});

module.exports = router;
