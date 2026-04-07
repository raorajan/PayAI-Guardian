"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.post('/register', auth_controller_1.register);
authRouter.post('/login', auth_controller_1.login);
authRouter.post('/forgot-password', auth_controller_1.forgotPassword);
exports.default = authRouter;
