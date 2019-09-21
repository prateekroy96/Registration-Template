const express = require('express')
const session = require('express-session')
const passport = require('./passport')
const router = require('./routes')
const path = require('path')
const exphbs = require('express-handlebars');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'mysecretstring'
}))

port = process.env.PORT || 3000

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', 'views')

app.use(passport.initialize())
app.use(passport.session())

app.use('/static', express.static(path.join(__dirname, 'static')))

app.use('/user/:name', (req, res) => {
    console.log(req.body)
    res.render('online', { title: "Online" })
})

app.get('/dashboard', (req, res) => {
    console.log("context", context)
    if (req.user) {
        var context = req.user.dataValues
        res.render('dashboard', { username: context.username, firstName: context.firstName, lastName: context.lastName, createdAt: context.createdAt })
    }
    else{
        res.redirect("/login")
    }

})

app.get('/logout',function(req, res){
    req.logout();
    res.redirect('/login');
  })

app.get('/login', (req, res) => {
    console.log("login got req:", req.body)
    res.render('login', { title: "Login", layout: "background" })
})

app.get('/signup', (req, res) => {
    console.log("signup got req:", req.body)
    res.render('signup', { title: "Sign Up", layout: "background" })

})

app.get('/deactivate', (req, res) => {
    console.log("deactivate got req:", req.body)
    res.render('deactivate', { title: "Deactivate", layout: "background" })
})

app.use('/auth', router, (req, res) => {
    console.log("posted to route")
})

app.use('/', (req, res) => {
    console.log("/ got req:", req.body)
    res.redirect("/login")
})

app.listen(port, () => console.log("Server running on:" + port))

