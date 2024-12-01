import passwordComplexity from "joi-password-complexity";
import Joi from 'joi';
import joiObjectid from "joi-objectid";

Joi.objectId = joiObjectid(Joi)

export default function(user) {

    const passwordComplexityOptions = {
        min: 8,
        max: 32,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 5,
    };

    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        email: Joi.string().required().email(),
        password: passwordComplexity(passwordComplexityOptions).required(),
        birthDate: Joi.date().required(),
        profilePic: Joi.objectId(),
        username: Joi.string().max(20).required(),
        aboutUser: Joi.string().max(160),
        verificationCode: Joi.string().length(8).required()
    });

    return schema.validate(user);
} 