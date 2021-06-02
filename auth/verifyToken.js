const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

module.exports = (req, res, next) => {
    const token = req.cookies['auth-token']
    const csrf = req.get('CSRFToken')
    //console.log('CSRF: ' + csrf)
    //console.log('Cookie: ' + req.cookies['auth-token'])
    if(!token || !csrf) {
        console.log('No token. No CSRF. Access Denied' )
        return res.status(401).json({message: 'Not Authenticated. Access Denied'})
    }

    try{
        const decoded = jwt.verify(token, secret.secret);
        req.info = decoded
        next()
    }catch (e) {
        console.log('Invalid Token')
        return res.status(401).json({message: 'Invalid Authentication (Token Invalid)'})
    }
}