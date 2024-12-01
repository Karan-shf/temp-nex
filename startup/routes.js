import express from "express";
import morgan from "morgan";
import users from "../routes/users.js";
import error from "../middlewares/error.js";
import logger from "./logging.js";

export default function(app) {

    if (app.get('env') === 'development') {
        app.use(morgan('dev'));
        logger.info("morgan enabled...");
    }

    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); 

    app.use("/IAM", users);

    app.use(error);
}