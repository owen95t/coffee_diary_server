const joi = require('joi');

exports.registerValidation = (data) => {
    const schema = joi.object({
        username: joi.string()
            .email()
            .required()
            .lowercase(),
        password: joi.string()
            .min(6)
            .required()
    })
    return schema.validate(data)
}

exports.loginValidation = (data) => {
    const schema = joi.object({
        username: joi.string()
            .email()
            .required()
            .lowercase(),
        password: joi.string()
            .min(6)
            .required()
    })
    return schema.validate(data)
}