const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const secret = require('../config/secret')
const jwt = require('jsonwebtoken')
const inputValidate = require('../auth/userValidation')

exports.createNewUser = async (req, res) => {
    //Dont forget to also validate in frontend for good UX
    const {error} = inputValidate.registerValidation(req.body)
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).json({message: 'User already exists!'})
    }

    const hashedPass = await bcrypt.hash(req.body.password, 10);
    //catch bcrypt errors
    const newUser = new User({
        username: req.body.username,
        password: hashedPass
    })
    try{
        const savedUser = await newUser.save();
        return res.status(201).send(savedUser);
    }catch (e) {
        return res.status(400).send(e)
    }
}

exports.userLogin = async (req, res) => {
    const user = User.findOne({username: req.body.username})
    if (!user) {
        return res.status(400).json({message: 'User does not exist!'})
    }

    const passwordCheck = await bcrypt.compare(req.body.password, user.password)
    if (!passwordCheck) {
        return res.status(400).json({message: 'Incorrect password!'})
    }

    const token = jwt.sign({_id: user._id}, secret.secret, {expiredIn: 60 * 60})
    res.cookie('auth-token', token, {httpOnly: true}).json({message: 'Login Success'})
}