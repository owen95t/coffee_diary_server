const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoffeeSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    beans: {
        type: String,
        required: true
    },
    roast: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    grind_size: {
        type: String,
        required: true
    },
    yield: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    equipment: {
      type: String
    },
    remarks: {
        type: String
    },
    roaster_remarks: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("CoffeeSchema", CoffeeSchema)