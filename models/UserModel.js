const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: 'user' //two options: user or admin.
    }
}, {
    collection: 'users'
})

module.exports = mongoose.model("UserSchema", UserSchema)
