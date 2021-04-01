const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

module.exports = (req, res, next) => {
    // const token = req.header('auth-token');
    const token = req.cookies['auth-token']
    console.log('HEADER: ' + req.header('auth-token'))
    console.log('Cookie: ' + req.cookies['auth-token'])
    if (!token) {
        console.log('Access Denied')
        return res.status(401).json({message: 'Access Denied. No token'})
    }

    try{
        const verified = jwt.verify(token, secret.secret);
        req.user = verified
        next()
    }catch (e) {
        console.log('Invalid Token')
        return res.status(401).json({message: 'Invalid Token'})
    }
}