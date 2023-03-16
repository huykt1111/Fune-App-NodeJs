import express from "express";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRouters = (app) => {
    router.post('/api/login', userController.handleLogin);
    router.post('/api/register', userController.handleRegister);

    return app.use("/", router);
}

module.exports = initWebRouters;