import { Router } from "express";
import { validateUser, User, createJwtToken } from "../models/user.js";
import _ from "lodash";
import bcrypt from "bcrypt";
import Joi from "joi";
import auth from "../middlewares/auth.js";
// import multer from "mu"

const router = Router();

router.post("/me",auth, async (req,res) => {
    return res.send(_.omit(req.user, ["password"]));
})

router.post("/check/email", async (req,res) => {
    if (req.body.email==="") return res.status(400).send("no email provided");
    const user = await User.findOne({ where: { email: req.body.email} });
    if (user ) return res.status(400).send("the given email is already taken");
    return res.send(true);
})

router.post("/check/username", async (req,res) => {
    if (req.body.username==="") return res.status(400).send("no username provided");
    const user = await User.findOne({ where: { username: req.body.username} });
    if (user) return res.status(400).send("the given username is already taken");
    return res.send(true);
})

router.post("/register", async (req,res) => {

    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details);

    let user = await User.findOne({ where: { email: req.body.email} });
    if (user) return res.status(400).send("the given email is already taken");

    user = await User.findOne({ where: { username: req.body.username} });
    if (user) return res.status(400).send("the given username is already taken");

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    
    user = await User.create(req.body);
    
    const token = createJwtToken(user.id);

    return res.header("x-auth-token", token).send(_.omit(user.toJSON(), ["password"]));
});

router.post("/login", async (req,res) => {

    function validateLoginReq(req) {
        const schema = Joi.object({
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(8).max(20).required()
        });
    
        return schema.validate(req);
    }

    const {error} = validateLoginReq(req.body);
    if (error) return res.status(400).send(error.details);

    let user = await User.findOne({ where: { email: req.body.email} });
    if (!user) return res.status(400).send("invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("invalid email or password");

    const token = createJwtToken(user.id);

    res.send(token);
})



export default router;