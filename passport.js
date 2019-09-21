const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('./db').Users

passport.serializeUser(function (user, done) {
    console.log("serializing: ")
    done(null, user.username)
})

passport.deserializeUser(function (username, done) {
    console.log("de-serializing: ")
    Users.findOne({
        username: username
    }).then((user) => {
        if (!user) {
            return done(new Error("No such user"))
        }
        return done(null, user)
    }).catch((err) => {
        done(err)
    })
})

passport.use(new LocalStrategy(function (username, password, done) {
    console.log("local-strategy:",username,password)
    Users.findOne({
        where: {
            username: username
        }
    }).then((user) => {
        if (!user) {
            return done(null, false, {message: "No such user"})
        }
        if (user.password !== password) {
            return done(null, false, {message: "Wrong password"})
        }
        return done(null, user)
    }).catch((err) => {
        return done(err)
    })
}))

exports = module.exports = passport