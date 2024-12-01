import { User } from "../Domain/models/user.js";

export async function userCreate(user) {
    return await User.create(user);
}

export async function userRead(condition) {
    return await User.findAll({ where: condition });
}

export async function userReadByID(id) {
    return await User.findByPk(id);
}