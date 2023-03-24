import express from "express";
import route from './index'

let initWebRouters = (app) => {
    return app.use("/api", route);
}

module.exports = initWebRouters;