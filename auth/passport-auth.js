const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrpyt = require('bcryptjs')
const User = require('../models/UserModel')

const verifyCallback = (username, password, done) => {}
const strategy = new LocalStrategy({})

function init(passport){
    const authenticate = async (username, password, done) => {
        const user = await User.findOne({username: username})
        if (user == null || !user) {
            return done(null, false, { message: 'No User with that email'})
        }
        try {
            if(await bcrpyt.compare(password, user.password)){
                return done(null, user)
            } else {
                return done(null, false, {message: 'Password incorrect'})
            }
        }catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}),
        authenticate)

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((id, done) => {
        done(null, { id })
    })
}

module.exports = init
