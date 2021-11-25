const User = require('../models/UserModel');

exports.login = async (email) => {
    return await User.findOne()
}

exports.register = async = () => {

}

exports.queryUser = async (email) => {
    return User.findOne({username: email});
}