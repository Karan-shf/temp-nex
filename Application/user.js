// import { createJwtToken } from "../Domain/models/user.js";
import createJwtToken from "./token.js";
import { userCreate, userRead } from "../Infrastructure/user.js";
// import auth from "../middlewares/auth.js";
import _ from "lodash";
import bcrypt from "bcrypt";
// import Joi from "joi";
import registerValidate from "../Contracts/register.js";
import loginValidate from "../Contracts/login.js";


export async function userRegister(req,res) {

    const {error} = registerValidate(req.body);
    if (error) return res.status(400).send(error.details);

    // let user = await User.findOne({ where: { email: req.body.email} });
    let user = await userRead({ email: req.body.email });
    user = user[0];
    if (user) return res.status(400).send("the given email is already taken");

    user = await userRead({ username: req.body.username });
    user = user[0];
    if (user) return res.status(400).send("the given username is already taken");

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user = await userCreate(req.body);
    
    const token = createJwtToken(user.id);

    return res.header("x-auth-token", token).json({"user": _.omit(user.toJSON(), ["password"])});
}

export async function userLogin(req,res) {

    const {error} = loginValidate(req.body);
    if (error) return res.status(400).send(error.details);
    
    let user = await userRead({ email: req.body.email });
    user = user[0];
    if (!user) return res.status(400).send("invalid email or password");
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("invalid email or password");
    
    const token = createJwtToken(user.id);
    
    res.json({"token": token});
}

export async function me(req,res) {
    return res.json({"user": _.omit(req.user, ["password"])});
}


export async function checkEmail(req,res) {
    if (req.body.email==="") return res.status(400).send("no email provided");
    let user = await userRead({ email: req.body.email });
    user = user[0];
    if (user) return res.status(400).json({"message": "the given email is already taken", "success": false});
    return res.json({"success": true});
}

export async function checkUsername (req,res) {
    if (req.body.username==="") return res.status(400).send("no username provided");
    // let user = await User.findOne({ where: { username: req.body.username} });
    let user = await userRead({ username: req.body.username});
    user = user[0];
    if (user) return res.status(400).json({"message": "the given username is already taken", "success": false});
    return res.json({"success": true});
}