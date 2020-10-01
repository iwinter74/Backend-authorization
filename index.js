const express = require('express');
const authRoutes = require('./routes/authRoutes')
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
require('./config/passport-setup')
const passport = require('passport');
const app = express()
const keys = require('./config/keys')
const profileRoutes = require('./routes/profileRoutes')

//Database connection
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to db')
    })

app.use(cookieSession({
    name: 'session',
    maxAge:24*60*60*1000,
    keys: [keys.session.cookieKey]
}))

app.use(express.static('public'))
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.get('/', (req, res) => {
    res.render('index')
})



app.listen(3000, () => {
    console.log('listening at 3000')
})