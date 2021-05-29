const Entry = require('../models/CoffeeModel')

exports.index = async (req, res) => {
    return res.status(200).json({message: 'You are at the root of the API. You require authentication to go forwards.'})
}

exports.newEntry = async (req, res) => {
    //Express session
    // const user_id = req.session.uid
    // req.body.user_id = user_id

    console.log(req.body)

    //JWT
    const user_id = req.info._id
    req.body.user_id = user_id

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
    //Express session:
    // const user_id = req.session.uid
    //JWT
    //const token = req.info
    const user_id = req.info._id
    //console.log("token: " + token + ' id: ' + token._id)

    const results = await Entry.find({user_id: user_id}).catch(e => {
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
    //Express
    //const user_id = req.session.uid
    //JWT
    const user_id = req.info._id
    const results = await Entry.find({$text: {$search: req.body}, user_id: user_id}).catch(e => {
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

