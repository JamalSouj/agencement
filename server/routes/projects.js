const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db');
const { verifyToken } = require('../auth');

// Multer config for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// GET all projects (public)
// Can filter by category: ?category=bancaire
router.get('/', (req, res) => {
    try {
        const { category } = req.query;
        let query = `
            SELECT p.*, c.name as category_name, c.slug as category_slug 
            FROM projects p 
            LEFT JOIN categories c ON p.category_id = c.id
            ORDER BY p.created_at DESC
        `;
        let projects;

        if (category) {
            query = `
                SELECT p.*, c.name as category_name, c.slug as category_slug 
                FROM projects p 
                LEFT JOIN categories c ON p.category_id = c.id
                WHERE c.slug = ?
                ORDER BY p.created_at DESC
            `;
            projects = db.prepare(query).all(category);
        } else {
            projects = db.prepare(query).all();
        }

        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single project (public)
router.get('/:id', (req, res) => {
    try {
        const project = db.prepare(`
            SELECT p.*, c.name as category_name, c.slug as category_slug 
            FROM projects p 
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = ?
        `).get(req.params.id);

        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new project (Admin Only)
router.post('/', verifyToken, upload.single('image'), (req, res) => {
    try {
        const { title, description, client, category_id } = req.body;
        const image_url = req.file ? `/uploads/${req.file.filename}` : null;

        if (!title || !category_id) {
            return res.status(400).json({ error: 'Title and category_id are required' });
        }

        const stmt = db.prepare(`
            INSERT INTO projects (title, description, client, image_url, category_id)
            VALUES (?, ?, ?, ?, ?)
        `);
        const result = stmt.run(title, description, client, image_url, category_id);

        res.status(201).json({ id: result.lastInsertRowid, message: 'Project created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update project (Admin Only)
router.put('/:id', verifyToken, upload.single('image'), (req, res) => {
    try {
        const { title, description, client, category_id } = req.body;
        const id = req.params.id;

        const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
        if (!existing) return res.status(404).json({ error: 'Project not found' });

        const image_url = req.file ? `/uploads/${req.file.filename}` : existing.image_url;

        const stmt = db.prepare(`
            UPDATE projects 
            SET title = ?, description = ?, client = ?, image_url = ?, category_id = ?
            WHERE id = ?
        `);
        stmt.run(title || existing.title, description || existing.description, client || existing.client, image_url, category_id || existing.category_id, id);

        res.json({ message: 'Project updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE project (Admin Only)
router.delete('/:id', verifyToken, (req, res) => {
    try {
        const id = req.params.id;
        const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
        if (!existing) return res.status(404).json({ error: 'Project not found' });

        db.prepare('DELETE FROM projects WHERE id = ?').run(id);

        // Optional: Delete the image file from disk
        if (existing.image_url) {
            const fs = require('fs');
            const filePath = path.join(__dirname, '..', existing.image_url);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
