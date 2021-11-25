const joi = require('joi');

//TODO: Remove email requirement
exports.registerValidation = (data) => {
    const schema = joi.object({
        username: joi.string()
            .email()
            .required()
            .lowercase(),
        password: joi.string()
            .min(6)
            .max(20)
            .required()
    })
    return schema.validate(data)
}
//TODO: Remove email requirement
exports.loginValidation = (data) => {
    const schema = joi.object({
        username: joi.string()
            .email()
            .required()
            .lowercase(),
        password: joi.string()
            .min(6)
            .max(20)
            .required()
    })
    return schema.validate(data)
}