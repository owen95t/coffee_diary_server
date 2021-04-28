const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/UserController')
const auth = require('../auth/verifyToken')
const authSesh = require('../auth/verifySessions')


router
    .route('/')
    .get(authSesh, (req, res) => {
        console.log('/api/user root requested');
        res.send('/api/user root. User ID: ' + req.user._id)
    });

router
    .route('/register')
    .post(userController.createNewUser)
    // .post(async (req, res) => {
    //     //res.status(201).json({message: "Success"})
    //     res.status(401).json({message: "Error"})
    // })

router
    .route('/login')
    .post(userController.userLogin)

router
    .route('/logout')
    .get(userController.userLogout)

router
    .route('/details')
    .get(authSesh, (req, res) => {
        res.status(200).json({message: 'Test Request Success!'})
    })


module.exports = router