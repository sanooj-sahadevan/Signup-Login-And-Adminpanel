const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    phonenumber: Number,
    password: String


})

const userCollection = mongoose.model("users", userSchema)

module.exports = userCollection