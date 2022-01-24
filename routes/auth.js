const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require("../validation/auth_validation");
const jwt = require('jsonwebtoken');
// const env = require('dotenv');


router.post("/register",async (req, res) => {
  const { error } = registerValidation(req.body);


  const emailExists = await User.findOne({ email: req.body.email });
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt) 
  if (error) {
    res.send({ validation: error.details[0].message });
  } else {
    if (emailExists) {
      res.send({ message: "user email already registered" });
    } else {
      try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
          });
        const savedUser = await user.save();
        res.send({ user: savedUser, validation: error });
      } catch (e) {
        res.status(400).send({
          error: e,
        });
      }
    }
  }
});

router.post("/login",async (req, res) => {
    const { error } = loginValidation(req.body);
    const emailExists = await User.findOne({ email: req.body.email });
    if (error) {
        res.send({ validation: error.details[0].message });
      } else {
        if (!emailExists)return res.send({ message: "email not found" });
       
        const user = await User.findOne({ email: req.body.email });
        const validPassword = await bcrypt.compare(req.body.password, user.password);   
        
        if(!validPassword) return res.status(400).send({ message: "password invalid" });
        console.log(process.env.JWT)
        const token = jwt.sign({_id : user.id}, process.env.JWT);
        res.send({token: token});
        return;
      }
});

router.get("/data", async ()  => {
  const user = await User.findOne({ id: req.user._id });
  return user;
});

module.exports = router;
