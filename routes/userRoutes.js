const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/UserController')
const auth = require('../auth/verifyToken')


router
    .route('/')
    .get(auth, (req, res) => {
        console.log('/api/user root requested');
        res.send('/api/user root. User ID: ' + req.user._id)
    });

router
    .route('/register')
    .post(userController.createNewUser)

router
    .route('/login')
    .post(auth, userController.userLogin)


module.exports = router