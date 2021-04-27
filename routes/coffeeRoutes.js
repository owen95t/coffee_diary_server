const express = require('express');
const router = express.Router();
const Entry = require('../models/CoffeeModel');
const auth = require('../auth/verifyToken')
const authSesh = require('../auth/verifySessions')
const EntryController = require('../controllers/EntryController')

router
    .route('/') // api/coffee/
    .get(authSesh, EntryController.index)

router
    .route('/new')
    .post(auth, EntryController.newEntry)

router
    .route('/all')
    .get(auth, EntryController.getAll)

router
    .route('/searchall')
    .get(auth, EntryController.searchAll)

module.exports = router

