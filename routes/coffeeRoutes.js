const express = require('express');
const router = express.Router();
const Entry = require('../models/CoffeeModel');
const auth = require('../auth/verifyToken')

router
    .route('/') // api/coffee/
    .get(auth, (req, res) => {
        console.log('api/coffee ROOT called')
        res.send("You are at the root of the API")
    })

router
    .route('/all')
    .get(auth, async (req, res) => {
        const results = await Entry.find({}).catch(e => { //find all
            if (e) {
                console.log('Entry FIND ALL error: ' + e)
                return res.status(404).json({message: 'Mongoose Error'})
            }
        })
        if (!results) { //if results empty
            return res.status(404).json({message: 'No entries found!'})
        }
        return res.status(200).json(results)
    })

router
    .route('/:name')//search
    .get(auth, async (req, res) => {
        const name = req.params.name
        const entry = await Entry.findOne({name: name})
    })

router
    .route('/:id')
    .get(auth, async (req, res) => {
        const id = req.params.id
        const entry = await Entry.findOne({_id: id})
        if (entry) {
            return res.status(200).json({entry})
        }
        return res.status(404).json({message: 'Cant find the entry'})
    })

router
    .route('/new')
    .post(auth, async (req, res) => {
        const newEntry = new Entry(req.body)
        try{
            await newEntry.save();
        }catch (e) {
            console.log('Save error ' + e)
            return res.status(400).json({message: 'Save failes'})
        }
        return res.status(201).json({message: 'Created and saved successfully'})
    })

router
    .route('/all')
    .get(auth, async (req, res) => {
        const all = await Entry.find({}).catch(e => {
            if (e) {
                console.log('Mongoose Find Error: ' + e)
                return res.status(400).json({message: 'Mongoose find error'})
            }
        })
        if (!all) {
            return res.status(404).json({message: 'No resource found!'})
        }
        return res.status(200).json({all})
    })

module.exports = router

