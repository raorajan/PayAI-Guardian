const controllerLogger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (Object.keys(req.body).length) {
        console.log('Body:', JSON.stringify(req.body, null, 2));
    }
    next();
};

module.exports = controllerLogger;
