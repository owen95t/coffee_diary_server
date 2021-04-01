const Entry = require('../models/CoffeeModel')

exports.index = async (req, res) => {
    return res.status(200).json({message: 'You are at the root of the API. You require authentication to go forwards.'})
}

exports.newEntry = async (req, res) => {
    const newEntry = new Entry(req.body)

    try{
        await newEntry.save();
    }catch (e) {
        console.log(e);
        return res.status(400).json({message: 'Save Error!'})
    }
    return res.status(201).json({message: 'Save Success! New Entry Created'})
}

exports.getAll = async (req, res) => {
    const results = await Entry.find({}).catch(e => {
        if (e) {
            console.log(e);
            return res.status(400).json({message: 'Find error!'})
        }
    })
    if (!results) {
        console.log('Empty results')
        return res.status(404).json({message: 'No results found!'})
    }

    return res.status(200).json(results)
}

exports.searchAll = async (req, res) => {
    const results = await Entry.find({$text: {$search: req.body}}).catch(e => {
        if (e) {
            console.log('Search Error' + e)
            return res.status(400).json({message: 'Search Error'})
        }
    })
    if (!results) {
        console.log('Search results Empty');
        return res.status(404).json({message: 'No results found!'})
    }
    return res.status(200).json(results)
}

