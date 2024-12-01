import { Router } from "express";
// import { validateUser, User, createJwtToken } from "../../Domain/models/user.js";
// import _ from "lodash";
// import bcrypt from "bcrypt";
// import Joi from "joi";
import auth from "../../middlewares/auth.js";
// import { userCreate, userRead } from "../../Infrastructure/user.js";
// import multer from "mu"
import { userRegister, userLogin, me, checkEmail, checkUsername } from "../../Application/user.js";

const router = Router();

router.post("/register", userRegister);

router.post("/login",  userLogin);

router.post("/me",auth, me);

router.post("/check/email", checkEmail);

router.post("/check/username", checkUsername);


export default router;