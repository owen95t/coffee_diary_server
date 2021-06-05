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
            .max(4),
        grind_size: joi.number()
            .required()
            .max(3),
        yield: joi.number()
            .required()
            .max(4),
        time: joi.number()
            .required()
            .max(3),
        equipment: joi.string()
            .required(),
        remarks: joi.string(),
        roaster_remarks: joi.string(),
        date: joi.date()
            .required(),
        user_id: joi.string()
            .required()
    })
    return schema.validate(data)
}
