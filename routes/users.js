var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");


router.post("/register", async function (req, res) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    return res.json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async function (req, res) {
  try {
    console.log("🔍 Checking MongoDB Query...");
    console.log("📧 Email from request:", req.body.email, "| Type:", typeof req.body.email, "| Length:", req.body.email.length);
    const user = await User.findOne({ email: req.body.email }).maxTimeMS(30000);
    console.log("✅ Query Success:", user);
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        id: user._id.toString(), 
        email: String(user.email),  
        name: String(user.name),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "User Logged in Successfully",
      token: token,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
