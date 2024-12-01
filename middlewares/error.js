import logger from "../utilities/loggers/generalLogger.js"

export default function(err, req, res, next) {
    logger.error(err.message, err);
    return res.status(500).json({
        "message": "something went wrong",
        "error": err.message
    });
}
