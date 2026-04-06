const errorMiddleware = (err, req, res, next) => {
    let { status = 500, message, data } = err;

    console.error(`[Error] ${req.method} ${req.url} - ${message}`);

    // If message is not provided, use default
    message = status === 500 || !message ? 'Internal server error' : message;

    res.status(status).send({
        type: 'Error',
        status,
        message,
        ...(data && data)
    });
};

module.exports = errorMiddleware;
