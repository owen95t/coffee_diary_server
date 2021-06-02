const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController')
const auth = require('../auth/verifyToken')

router
    .route('/')
    .get(auth, (req, res) => {

        console.log('/api/user root requested by + ' + req.info._id);
        res.json({message: '/api/user root. User ID: ' +req.info._id})
    });

router
    .route('/register')
    .post(userController.createNewUser)

router
    .route('/login')
    .post(userController.userLogin)

router
    .route('/logout')
    .get(userController.userLogout)

router
    .route('/details')
    .get(auth, (req, res) => {
        console.log()
        res.status(200).json({message: 'Test Request Success!'})
    })

router
    .route('/me')
    .get(auth, (req, res) => {

    })

router
    .route('/check')
    .get(userController.checkValidSession)

module.exports = router