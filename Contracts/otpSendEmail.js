import Joi from "joi";

export default function (req) {
    const schema = Joi.object({
        email: Joi.string().required().email()
    });

    return schema.validate(req);
}