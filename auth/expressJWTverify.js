const jwt = require('express-jwt')
const sk = require('../config/secret')

module.exports = (req, res, next) => {
    jwt({secret: sk.secret})
}