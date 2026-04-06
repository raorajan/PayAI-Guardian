const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

    if (!authHeader) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(401).send({ error: 'Invalid token.' });
    }
};

module.exports = auth;
