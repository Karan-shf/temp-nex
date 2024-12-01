import { jwtSecret } from "../utilities/config/config.js";
// import { User } from "../Domain/models/user.js";
import jwt from "jsonwebtoken";
import { userReadByID } from "../Infrastructure/user.js";


export default async function(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("no token provided");

    try {
        const decoded = jwt.verify(token, jwtSecret);
        // const user = await User.findByPk(decoded._id);
        const user = await userReadByID(decoded._id);
        req.user = user.toJSON();
        next();
    } catch (error) {
        return res.status(400).send("invalid token");
    }
}