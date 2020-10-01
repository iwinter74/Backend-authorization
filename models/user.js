const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    googleId: String,
    firstName: String,
    lastName: String,
    emails: String,
    picture: String
})

const User = mongoose.model('usersDb', userSchema)

module.exports = User