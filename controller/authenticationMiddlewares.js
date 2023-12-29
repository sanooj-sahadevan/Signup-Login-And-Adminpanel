const mongoose = require("mongoose");
const userCollection = require("../models/userModel");
const bcrypt = require("bcrypt");


//verification
const userVerification = async (req, res, next) => {
  try {
    const existingUser = await userCollection.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      const comparePass = bcrypt.compareSync(
        req.body.password,
        existingUser.password
      );
      if (req.body.email == existingUser.email && comparePass) {

        req.session.user = true;
        req.session.email = req.body.email;
        next()
      } else {
        req.session.invalidCredentials = true;
        res.redirect("/");
      }
    } else {
      req.session.invalidCredentials = true;
      res.redirect("/");
    }
  } catch (error) {
    console.log(error)
  }
};



//Authentication

const userAuthentication = (req, res, next) => {

  try {

    if (req.session.admin) {
      res.redirect("/adminHome")

    } else {
      //  res.render("Userviews/userLogin")
      if (req.session.user) {

        next()
      } else {
        res.render("Userviews/userLogin",{
        invalidCredentials: req.session.invalidCredentials,
      emailExists: req.session.emailExists,
        })
        req.session.emailExists = false;
        req.session.invalidCredentials = false;
      }
    }
  } catch (error) {
    console.log(error);
  }
}


//existinguser

const existingUser = async (req, res, next) => {
  const thisUser = await userCollection.findOne({ email: req.body.email });
  if (!thisUser) {
    req.session.user = true;
    req.session.email = req.body.email;
    next()

  } else {
    req.session.emailExists = true;
    res.redirect("/home");
  }


}



module.exports = { userAuthentication, userVerification, existingUser }