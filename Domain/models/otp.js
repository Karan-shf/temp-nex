import { sequelize } from "../../DB/db.js";
import logger from "../../utilities/loggers/generalLogger.js";
import otpSchema from "../schemas/otp.js"

export const OTP = sequelize.define("OTP",otpSchema);

OTP.sync({alter:true}).then(() => logger.info("OTP Model Synced")).catch((ex) => logger.error(ex));