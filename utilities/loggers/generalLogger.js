import winston from "winston";

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.printf(({ message }) => message), // Display only the message
        }),
        new winston.transports.File({ 
            filename: "logs/app.log" ,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json() // Logs everything (default behavior)
            ),
        })
    ],
    exitOnError: false
});

// logger.exitOnError = false;

logger.exceptions.handle(
    new winston.transports.Console({
        format: winston.format.printf(({ message }) => message), // Display only the message
    }),
    new winston.transports.File({ 
        filename: "logs/exceptions.log",
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
    })
);

logger.rejections.handle(
    new winston.transports.Console({
        format: winston.format.printf(({ message }) => message), // Display only the message
    }),
    new winston.transports.File({ filename: "logs/rejections.log" })
);

// process.on("uncaughtException", (ex) => {
//     // console.log(`there was an uncaught exeption: ${ex}`);
//     logger.error(ex.message, ex);
// });

// process.on("unhandledRejection", (ex) => {
//     console.log(`there was an unhandled rejection: ${ex}`);
// });

export default logger;