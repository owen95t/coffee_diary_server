const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const secret = require('../config/secret')
const jwt = require('jsonwebtoken')
const inputValidate = require('../auth/userValidation')

exports.createNewUser = async (req, res) => {
    //Dont forget to also validate in frontend for good UX
    console.log(req.body.username)
    console.log(req.body.password)
    const {error} = inputValidate.registerValidation(req.body)
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    const user = await User.findOne({username: req.body.username}).catch(e => {
        console.log('USER FIND ONE ERROR ' + e)
    })
    if (user) {
        return res.status(400).json({message: 'User already exists!'})
    }
    let hashedPass;
    try {
        hashedPass = await bcrypt.hash(req.body.password, 10);
        if (!hashedPass) {
            return res.status(400).json({message: 'Bcrypt Error'})
        }
    }catch (e) {
        console.log('Hash Error: ' + e)
        return res.status(400).json({message: 'Bcrypt Error'})
    }
    const newUser = new User({
        username: req.body.username,
        password: hashedPass
    });
    try{
        const savedUser = await newUser.save();
        req.session.isAuth = true;
        return res.status(201).send(savedUser);
    }catch (e) {
        return res.status(400).send(e)
    }
}

exports.userLogin = async (req, res) => {
    const user = await User.findOne({username: req.body.username}).catch(e => {
        if (e) {
            console.log('User Login Find One Error')
            return res.status(500).json({message: 'Mongoose Error'})
        }
    })
    if (!user) {
        return res.status(400).json({message: 'User does not exist!'})
    }
    try{
        let result = await bcrypt.compare(req.body.password, user.password)
        if (!result) {
            console.log('Password doesnt match')
            return res.status(400).json({message:'Password Doesnt Match'})
        }
    }catch (e) {
        console.log(e);
        return res.status(400).json({message: 'Bcrypt error'})
    }

    //Removing JWT AUTH
    // const token = jwt.sign(
    //     {_id: user._id},
    //     secret.secret,
    //     {expiresIn: 60 * 60})

    //Adding Sessions Auth
    req.session.isAuth = true;
    req.session.uid = user._id;
    //res.status(200).cookie('auth-token', token, {httpOnly: true}).json({message: 'Login Success'})
    return res.status(200).json({message: 'Login Success'})
}

exports.userLogout = (req, res) => {
    // setTimeout((() => {
    //     req.session.destroy()
    //     return res.status(200).json({message: 'Logout Complete'})
    // }), 2000)
    req.session.destroy()
    return res.status(200).json({message: 'Logout Complete'})
}