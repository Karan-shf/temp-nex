import config from "config";

export const port = config.get("app.port");
export const dbName = config.get("db.postgres.name");
export const dbHost = config.get("db.postgres.host");
export const dbUser = config.get("db.postgres.user");
export const dbPassword = config.get("db.postgres.password");
export const dbDialect = config.get("db.postgres.dialect");
export const jwtSecret = config.get("jwtSecret");
export const emailName = config.get("nodeMailer.emailName");
export const emailAppPassword = config.get("nodeMailer.emailAppPassword");