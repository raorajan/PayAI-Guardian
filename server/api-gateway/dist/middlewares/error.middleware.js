"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    res.status(status).json({
        type: 'error',
        status,
        message,
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
        data: null,
    });
};
exports.default = errorMiddleware;
