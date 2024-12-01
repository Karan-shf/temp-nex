import { Sequelize } from 'sequelize';
import { dbName, dbHost, dbUser, dbPassword, dbDialect } from '../utilities/config/config.js';
import logger from '../utilities/loggers/generalLogger.js';
import dbLogger from '../utilities/loggers/dbLogger.js';

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    logging: (msg) => dbLogger.info(msg)
});

export async function db() {
    sequelize.authenticate()
    .then(() => logger.info('Connection to postgreSQL established successfully.'))
    .catch((err) => logger.error('Unable to connect to the postgre database', err))
}

// export async function closeConnection() {
//     await sequelize.close();
// }

// export async function syncModels() {
//     sequelize.sync({alter: true}).then(() => console.log('All models were synchronized successfully.'));
// }