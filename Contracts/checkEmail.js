import Joi from "joi";

export default function (req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
    });

    return schema.validate(req);
}