const userModel = require("../models/user-model");

const bcrypt = require("bcrypt");
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser =  async function (req, res) {
  try {
    let { email, password, fullname } = req.body; //check joy

    let user = await userModel.findOne({email: email});
    if(user) return res.status(401).send("You already have an account, please login");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let createdUser = await userModel.create({
            email,
            password: hash,
            fullname,
          });
          
          let token = generateToken(createdUser);
          res.cookie("token", token);
          res.send("User created successfully");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
}
module.exports.loginUser =  async function (req, res) {
  try {
    let { email, password } = req.body; //check joy

    let user = await userModel.findOne({email: email});
    if(!user) return res.status(401).send("Email or Password incorrect");

    bcrypt.compare(password, user.password, function (err, result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.send("You can login");
        }
        else{
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/");
        }
    })
    
  } catch (err) {
    res.send(err.message);
  }
}
module.exports.logoutUser =  async function (req, res) {
  res.cookie("token", "");
  res.redirect("/")
}