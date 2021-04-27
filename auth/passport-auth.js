//const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrpyt = require('bcryptjs')

function init(passport){
    const authenticate = async (email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null) {
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
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {

    })
}

module.exports = init
