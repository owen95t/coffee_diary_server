const joi = require('joi')

exports.entryValidation = (data) => {
    const schema = joi.object({
        brand: joi.string()
            .required()
            .max(15),
        beans: joi.string()
            .required()
            .max(15),
        roast: joi.string()
            .required()
            .max(15),
        weight: joi.number()
            .required()
            .max(1000),
        grind_size: joi.number()
            .required()
            .max(100),
        yield: joi.number()
            .required()
            .max(1000),
        time: joi.number()
            .required()
            .max(1000),
        equipment: joi.string()
            .required(),
        remarks: joi.string()
            .allow(null, ''),
        roaster_remarks: joi.string()
            .allow(null, ''),
        date: joi.date()
            .required(),
        user_id: joi.string()
            .required()
    })
    return schema.validate(data)
}

exports.updateValidation = (data) => {
    const schema = joi.object({
        brand: joi.string()
            .required()
            .max(15),
        beans: joi.string()
            .required()
            .max(15),
        roast: joi.string()
            .required()
            .max(15),
        weight: joi.number()
            .required()
            .max(1000),
        grind_size: joi.number()
            .required()
            .max(100),
        yield: joi.number()
            .required()
            .max(1000),
        time: joi.number()
            .required()
            .max(1000),
        equipment: joi.string()
            .required(),
        remarks: joi.string()
            .allow(null, ''),
        roaster_remarks: joi.string()
            .allow(null, ''),
        date: joi.date()
            .required(),
        user_id: joi.string()
            .required(),
        _id: joi.string()
            .required(),
        __v: joi.number()
            .required()
    })
    return schema.validate(data)
}