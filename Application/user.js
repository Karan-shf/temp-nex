// import { createJwtToken } from "../Domain/models/user.js";
import createJwtToken from "./token.js";
import { userCreate, userRead } from "../Infrastructure/user.js";
// import auth from "../middlewares/auth.js";
import _ from "lodash";
import bcrypt from "bcrypt";
// import Joi from "joi";
import registerValidate from "../Contracts/register.js";
import loginValidate from "../Contracts/login.js";
import otpSendEmailValidate from "../Contracts/otpSendEmail.js";
import checkEmailValidate from "../Contracts/checkEmail.js";
import crypto from "crypto";
import sendMail from "./nodeMailer.js";
import { otpCreate, otpDelete, otpRead } from "../Infrastructure/otp.js";
import logger from "../utilities/loggers/generalLogger.js";
// import crypto

export async function userRegister(req,res) {

    const {error} = registerValidate(req.body);
    if (error) return res.status(400).json({"error": error.details});

    let user = await userRead({ email: req.body.email });
    user = user[0];
    if (user) return res.status(400).json({"error": "the given email is already taken"});

    user = await userRead({ username: req.body.username });
    user = user[0];
    if (user) return res.status(400).jaon({"error": "the given username is already taken"});

    let otp = await otpRead({email: req.body.email});
    if (!otp) return res.status(404).json({"message":"no otp found"});

    otp = otp.toJSON();

    if (otp.expireTime.getTime() < Date.now()) {
        await otpDelete({id: otp.id});
        return res.status(400).json({"message":"otp expire time has passed"});
    }

    if (otp.verificationCode != req.body.verificationCode) return res.status(400).json({"message":"incorrect otp code"});

    await otpDelete({id: otp.id});

    logger.info(`${req.body.email} verified`);

    // let user = await User.findOne({ where: { email: req.body.email} });

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user = await userCreate(req.body);
    
    const token = createJwtToken(user.id);

    return res.header("x-auth-token", token).json({"user": _.omit(user.toJSON(), ["password"])});
}

export async function userLogin(req,res) {

    const {error} = loginValidate(req.body);
    if (error) return res.status(400).json({"error": error.details});
    
    let user = await userRead({ email: req.body.email });
    user = user[0];
    if (!user) return res.status(400).json({"error": "invalid email or password"});
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({"error": "invalid email or password"});
    
    const token = createJwtToken(user.id);
    
    res.header("x-auth-token", token).json({"user": _.omit(user.toJSON(), ["password"])});
}

export async function me(req,res) {
    return res.json({"user": _.omit(req.user, ["password"])});
}


export async function checkEmail(req,res) {

    const {error} = checkEmailValidate(req.body);
    if (error) return res.status(400).json({"error": error.details});

    // if (req.body.email==="") return res.status(400).json({"error": "no email provided"});

    let user = await userRead({ email: req.body.email });

    user = user[0];

    if (user) return res.status(400).json({"message": "the given email is already taken", "success": false});

    return res.json({"success": true});
}

export async function checkUsername(req,res) {
    if (req.body.username==="") return res.status(400).json({"error": "no username provided"});
    // let user = await User.findOne({ where: { username: req.body.username} });
    let user = await userRead({ username: req.body.username});
    user = user[0];
    if (user) return res.status(400).json({"message": "the given username is already taken", "success": false});
    return res.json({"success": true});
}

export async function sendVerificationEmail(req,res) {

    const {error} = otpSendEmailValidate(req.body);
    if (error) return res.status(400).json({"error": error.details});

    // let user = await User.findOne({ where: { email: req.body.email} });
    let user = await userRead({ email: req.body.email });

    user = user[0];
    if (user) return res.status(400).json({"error": "the given email is already taken"});

    const confirmationCode = crypto.randomBytes(4).toString("hex")

    // console.log(user)

    const emailSent = await sendMail({
        title: "Email Confirmation - Float Team",
        text: `Welcome to NEX,\n\nYour confirmation code is: ${confirmationCode}\n\nThis code is valid for 20 minutes.`,
        targetEmail: req.body.email
    });

    logger.info(`confirmation email sent to ${req.body.email}`,emailSent);

    const otp = await otpCreate({
        email: req.body.email, 
        verificationCode: confirmationCode,
    });

    return res.json({"otp": otp});
}

// export async function checkVerificationEmail(req,res) {

   

//     let otp = await otpRead({email: req.body.email});
//     if (!otp) return res.status(404).json({"message":"no otp found"});

//     otp = otp.toJSON();

//     if (otp.expireTime.getTime() < Date.now()) {
//         await otpDelete({id: otp.id});
//         return res.status(400).json({"message":"otp expire time has passed"});
//     }

//     if (otp.verificationCode != req.body.code) return res.status(400).json({"message":"incorrect otp code"});

//     await otpDelete({id: otp.id});

//     logger.info(`${req.body.email} verified`);

//     return res.json({"success": true});
// }