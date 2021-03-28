const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({message: 'Access Denied'})
    }

    try{
        const verified = jwt.verify(token, secret.secret);
        req.user = verified
        next()
    }catch (e) {
        return res.status(400).json({message: 'Invalid Token'})
    }
}