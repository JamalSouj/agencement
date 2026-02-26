const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const categoryRoutes = require('./routes/categories');
const contactRoutes = require('./routes/contacts');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'France Agencement API is running' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
