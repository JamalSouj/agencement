const jwt = require('jsonwebtoken');

// In a real app, this should be an environment variable.
const SECRET_KEY = 'super_secret_france_agencement_key_2026';

function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });
}

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access Denied: No Token Provided' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Access Denied: Invalid Token' });
        req.user = user;
        next();
    });
}

module.exports = {
    generateToken,
    verifyToken,
    SECRET_KEY
};
