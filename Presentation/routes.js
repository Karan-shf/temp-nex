import express from "express";
import morgan from "morgan";
import users from "./routes/user.js";
import error from "../middlewares/error.js";
import cors from "../middlewares/cors.js";
import logger from "../utilities/loggers/generalLogger.js";

export default function(app) {

    if (app.get('env') === 'development') {
        app.use(morgan('dev'));
        logger.info("morgan enabled...");
    }

    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); 
    app.use(cors);

    app.use("/IAM", users);

    app.use(error);
}