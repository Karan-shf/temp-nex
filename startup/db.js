import { Sequelize } from 'sequelize';
import winston from 'winston';
// import config from 'config';
import { dbName, dbHost, dbUser, dbPassword, dbDialect } from './config.js';

// Create a Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/sequelize.log' }), // Logs to a file
    ],
});

// const dbName = config.get("db.postgres.name");
// const dbHost = config.get("db.postgres.host");
// const dbUser = config.get("db.postgres.user");
// const dbPassword = config.get("db.postgres.password");
// const dbDialect = config.get("db.postgres.dialect");
// Connect to the PostgreSQL database
export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    logging: (msg) => logger.info(msg)
});

export async function db() {
    sequelize.authenticate()
    .then(() => logger.info('Connection to postgreSQL established successfully.'))
    .catch((err) => logger.error('Unable to connect to the postgre database', err))
}

export async function closeConnection() {
    await sequelize.close();
}

export async function syncModels() {
    sequelize.sync({alter: true}).then(() => console.log('All models were synchronized successfully.'));
}