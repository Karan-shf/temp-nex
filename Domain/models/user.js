// import { DataTypes, Model } from 'sequelize';
// import jwt from 'jsonwebtoken';
import { sequelize } from '../../DB/db.js';
// import { jwtSecret } from '../../utilities/config/config.js';
// import passwordComplexity from "joi-password-complexity";
// import Joi from 'joi';
// import joiObjectid from "joi-objectid";
import logger from '../../utilities/loggers/generalLogger.js';
import userSchema from "../schemas/user.js";


// Joi.objectId = joiObjectid(Joi)


// export class User extends Model {

//     createJwtToken() {
//         console.log("salam")
//         const payload = {_id: this._id};

//         const options = {expiresIn: "24h"};

//         return jwt.sign(payload, jwtSecret, options);
//     }
// }

// User.init(
//     {
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         birthDate: {
//             type: DataTypes.DATE,
//             allowNull: false,
//         },
//         profilePic: {
//             type: DataTypes.STRING,
//             allowNull: true,
//             unique: true
//         },
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//         },
//         signDate: {
//             type: DataTypes.DATE,
//             allowNull: false,
//             defaultValue: Date.now()
//         },
//         aboutUser: {
//             type: DataTypes.STRING(160),
//             allowNull: true,
//         },
//         verificationState: {
//             type: DataTypes.ENUM("notVerified", "pendingVerification","verified"),
//             allowNull: false,
//             defaultValue: "notVerified"
//         },
//         isBanned: {
//             type:DataTypes.BOOLEAN,
//             allowNull: false,
//             defaultValue: false
//         }
//     },
//     {
//         sequelize,
//         modelName: 'User',
//         tableName: 'Users',
//         timestamps: true,
//     }
// )

// const userSchema = {
//     name: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     birthDate: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     profilePic: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         unique: true
//     },
//     username: {
//         type: DataTypes.STRING(20),
//         allowNull: false,
//         unique: true,
//     },
//     signDate: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: Date.now()
//     },
//     aboutUser: {
//         type: DataTypes.STRING(160),
//         allowNull: true,
//     },
//     verificationState: {
//         type: DataTypes.ENUM("notVerified", "pendingVerification","verified"),
//         allowNull: false,
//         defaultValue: "notVerified"
//     },
//     isBanned: {
//         type:DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false
//     }
// }

// userSchema.createJwtToken = function() {

//     const payload = {_id: this._id};

//     const options = {expiresIn: "24h"};

//     return jwt.sign(payload, jwtSecret, options);
// }

// export function createJwtToken(id) {

//     const payload = {_id: id};

//     const options = {expiresIn: "24h"};

//     return jwt.sign(payload, jwtSecret, options);
// }

export const User = sequelize.define('User', userSchema);

// export function validateUser(user) {

//     const passwordComplexityOptions = {
//         min: 8,
//         max: 32,
//         lowerCase: 1,
//         upperCase: 1,
//         numeric: 1,
//         symbol: 1,
//         requirementCount: 5,
//     };

//     const schema = Joi.object({
//         name: Joi.string().max(50).required(),
//         email: Joi.string().required().email(),
//         password: passwordComplexity(passwordComplexityOptions).required(),
//         birthDate: Joi.date().required(),
//         profilePic: Joi.objectId(),
//         username: Joi.string().max(20).required(),
//         aboutUser: Joi.string().max(160)
//     });

//     return schema.validate(user);
// } 

User.sync({alter:true}).then(() => logger.info("User Model Synced")).catch((ex) => logger.error(ex.message, ex));