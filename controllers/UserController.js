const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const secret = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')
const inputValidate = require('../auth/userValidation')



exports.createNewUser = async (req, res) => {
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
    let savedUser;
    try{
        savedUser = await newUser.save();
        //Express session:
        //req.session.isAuth = true;
        //return res.status(201).send(savedUser);
    }catch (e) {
        return res.status(400).send(e)
    }
    if(!savedUser){
        return res.status(500).json({message: 'saved error'})
    }

    return res.status(201).json({message: 'User Created successfully'})
}

exports.userLogin = async (req, res) => {
    let user
    try{
        user = await User.findOne({username: req.body.username})
        if (!user) {
            return res.status(400).json({message: 'User does not exist!'})
        }
    }catch (e) {
        console.log('User Login Find One Error')
        return res.status(500).json({message: 'Mongoose Error'})
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

    //JWT AUTH
    const token = jwt.sign(
        {_id: user._id},
        secret,
        {expiresIn: '1d'})

    //Adding Sessions Auth
    //req.session.isAuth = true;
    //req.session.uid = user._id;

    //Token is same as auth-token
    return res.status(200).set({'CSRFToken': token}).cookie('auth-token', token, {path: '/', domain: '.netlify.app', httpOnly: true, secure: true, sameSite: "none"}).json({message: 'Login Success'})
}

exports.userLogout = (req, res) => {
    res.status(200).cookie('auth-token', '', {path: '/', domain: '.netlify.app', httpOnly: true, secure: true, sameSite: "none"}).json({message: 'Logout complete'})
    //Express sessions
    //req.session.destroy()
    //return res.status(200).json({message: 'Logout Complete'})
}

// exports.getUserInfo = async (req, res) => {
//     let userID = req.session.uid
//     try{
//         const user = await User.findOne({_id: userID})
//         if (user) {
//             return res.status(200).json(user)
//         }
//     }catch (e) {
//         return res.status(404).json({message: 'User not found!'})
//     }
// }

exports.checkValidSession = async (req, res) => {
    const token = req.cookies['auth-token']
    //console.log('Token: ' + token)
    if (!token) {
        console.log('No Token Found')
        return res.status(401).json({message: 'Invalid Session', valid: false})
    }



    let decoded;
    try{
        decoded = jwt.verify(token, secret)
    }catch (e) {
        console.log(e)
        console.log('JWT Error')
        return res.status(401).json({message: 'Session Check: JWT Error'})
    }
    //console.log('Decoded Token: ' + decoded)
    const user = User.findOne({username: decoded._id})

    if (!user) {
        console.log('No User Found')
        return res.status(401).json({message: 'Invalid Session', valid: false})
    }

    const csrfToken = jwt.sign(
        {_id: user._id},
        secret,
        {expiresIn: '1d'}
    )

    return res.status(200).set({'CSRFToken' : csrfToken}).json({message: 'Valid Session', valid: true})
}