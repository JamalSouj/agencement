const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../auth');

// GET all contact messages (Admin Only)
router.get('/', verifyToken, (req, res) => {
    try {
        const messages = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new contact message (Public)
router.post('/', (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        const stmt = db.prepare(`
            INSERT INTO contact_messages (name, email, phone, message)
            VALUES (?, ?, ?, ?)
        `);
        const result = stmt.run(name, email, phone, message);

        res.status(201).json({ id: result.lastInsertRowid, message: 'Contact message submitted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE contact message (Admin Only)
router.delete('/:id', verifyToken, (req, res) => {
    try {
        const id = req.params.id;
        const existing = db.prepare('SELECT * FROM contact_messages WHERE id = ?').get(id);
        if (!existing) return res.status(404).json({ error: 'Message not found' });

        db.prepare('DELETE FROM contact_messages WHERE id = ?').run(id);

        res.json({ message: 'Message deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
