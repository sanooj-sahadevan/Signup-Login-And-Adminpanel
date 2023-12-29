const adminCollection = require('../models/adminModel')
const userCollection = require('../models/userModel')
const bycrypt = require('bcrypt')




//adminHome
const adminHome = async (req, res) => {
    if (req.session.admin) {
        const allUsers = await userCollection.find()
        res.render('adminViews/adminHomepage', { allUsers })
    } else {
        res.redirect('/admin')
    }
}


//adminLogin
const adminLogin = async (req, res) => {
    if (req.session.admin) {
        res.redirect('/adminHome')
    } else {
        res.render('adminViews/adminLoginPage', { invalidCredentials: req.session.adminInvalidCredentials })
        req.session.adminInvalidCredentials = false
    }
}


//verification
const adminVerification = async (req, res) => {
    const existingAdmin = await adminCollection.findOne({ email: req.body.email })

    if (existingAdmin.email == req.body.email && existingAdmin.password == req.body.password) {
        req.session.admin = true
        res.redirect('/adminHome')
    } else {
        req.session.adminInvalidCredentials = true
        res.redirect('/')
    }
}



//logout
const adminLogout = async (req, res) => {
    req.session.destroy()
    res.redirect('/')
}


//add
const addUser = async (req, res) => {
    const encryptedPassword = bycrypt.hashSync(req.body.password, 10)
    const newUser = new userCollection({
        username: req.body.username,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: encryptedPassword
    })
    const checkEmail = await userCollection.findOne({ email: req.body.email })
    if (checkEmail) {
        res.send('Email already exists')
    } else {
        newUser.save()
        console.log(newUser)
        res.redirect('/adminHome')
    }
}



//edit
const editUser = async (req, res) => {
    const updateUser = await userCollection.findByIdAndUpdate({ _id: req.body.id }, { $set: { username: req.body.username, email: req.body.email, phonenumber: req.body.phonenumber, password: req.body.password } })
    res.redirect('/adminHome')
}



//editpage
const editUserPage = async (req, res) => {
    const userData = await userCollection.findOne({ _id: req.query.id })
    if (req.session.admin) {
        res.render('adminViews/adminHomepageEdit', { userData })
    } else {
        redirect('/adminHome')
    }
}



//delete
const deleteUser = async (req, res) => {
    const deletion = await userCollection.findByIdAndDelete({ _id: req.query.id })
    if (req.session.admin) {
        res.redirect('/adminHome')
    } else {
        res.redirect('/adminHome')
    }
}




module.exports = {
    adminHome, adminLogin, adminVerification, adminLogout, addUser, editUser, editUserPage, deleteUser
}