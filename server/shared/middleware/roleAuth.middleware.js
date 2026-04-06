const roleAuth = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).send({ error: 'Access denied. Unauthorized role.' });
        }
        next();
    };
};

module.exports = roleAuth;
