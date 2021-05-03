const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Todo: refractor to EntrySchema

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
    },
    user_id: {
        type: String,
        required: true
    }
})

CoffeeSchema.index({'$**': 'text'})

module.exports = mongoose.model("CoffeeSchema", CoffeeSchema)