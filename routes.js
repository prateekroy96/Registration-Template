const router = require('express').Router()
const Users = require('./db').Users
const session = require('express-session')
const passport = require('./passport')


//router.use('/',(req,res)=>res.send("het"))

router.post('/login', passport.authenticate('local', { successRedirect: '/auth/success',
failureRedirect: '/auth/fail' }));

router.get('/success',(req,res)=>{
    console.log("auth success")
    res.send({success: true, msg: ""})
})

router.get('/fail',(req,res)=>{
    console.log("auth fail")
    res.send({success: false, msg: "Authentication failed"})
})

router.post('/login', function (req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        console.log("authentication failure!");
        res.send(false)
    });

router.post('/signup', (req, res) => {
    console.log("got registration request:", req.body);
    Users.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstname,
        lastName: req.body.lastname
    })
        .then(name => {
            console.log("Success! Auto-generated ID:", name.id);
            res.send({ success: true, msg: "User succesfully registered" })
        })
        .catch(err => {
            let errors = err.errors[0].message;
            console.log(errors);
            res.send({ success: false, msg: "Error: " + errors })
        })
})

router.post('/deactivate', (req, res) => {
    console.log("got deactivation request:", req.body)
    Users.destroy({
        where: { username: req.body.username, password: req.body.password }
    })
        .then((name) => {
            if (name) {
                res.send({ success: true, msg: "User succesfully deleted" })
            }
            else {
                res.send({ success: false, msg: "User does not exist" })
            }

        })
        .catch(err => {
            let errors = err.errors[0].message;
            console.log(errors);
            res.send({ success: false, msg: "Error: " + errors })
        })
})

exports = module.exports = router