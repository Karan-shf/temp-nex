import "express-async-errors";
import express from "express";
import { db } from "./startup/db.js";
import { port } from "./startup/config.js";
import routes from "./startup/routes.js";
import logger from "./startup/logging.js";

db();

const app = express();
routes(app);

app.listen(port, () => logger.info(`listening on port ${port}...`));