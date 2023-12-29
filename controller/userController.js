const session = require("express-session");
const userCollection = require("../models/userModel");
const bcrypt = require("bcrypt");


// login
const userLogin = async (req, res) => {
  const thisUser = await userCollection.findOne({ email: req.session.email });
  if (req.session.user) {
    res.render("Userviews/userHomepage", { thisUser });
  } else {
    res.redirect("/");
  }
};




// sign up operation
const userSignup = async (req, res) => {
  let encryptedPassword = await bcrypt.hash(req.body.password, 10);
  let newUser = new userCollection({
    username: req.body.username,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    password: encryptedPassword,
  });

  await newUser.save();
  req.session.user = true;
  res.redirect("/home");
};




//userhome
const userHome = async (req, res) => {
  const thisUser = await userCollection.findOne({ email: req.session.email });
  // console.log(thisUser)
  if (req.session.user) {
    res.render("Userviews/userHomepage", { thisUser });
  } else {
    res.redirect("/");
  }
};



//logout
const userLogout = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
  console.log("logout");
};



module.exports = { userSignup, userLogin, userHome, userLogout };
