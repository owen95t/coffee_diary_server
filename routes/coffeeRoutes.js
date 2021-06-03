const express = require('express');
const router = express.Router();
const Entry = require('../models/CoffeeModel');
const auth = require('../auth/verifyToken')
const authSesh = require('../auth/verifySessions')
const EntryController = require('../controllers/EntryController')

router
    .route('/') // api/coffee/
    .get(auth, EntryController.index)

router
    .route('/new')
    .post(auth, EntryController.newEntry)

router
    .route('/all')
    .get(auth, EntryController.getAll)

router
    .route('/searchall')
    .get(auth, EntryController.searchAll)

router
    .route('/deleteEntry')
    .delete(auth, EntryController.deleteEntry)

router
    .route('/updateEntry')
    .put(auth, EntryController.updateEntry)

module.exports = router

