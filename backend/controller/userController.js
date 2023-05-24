const express = require("express");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const check = await User.findOne({ email });
    if (check) {
      res.json("email already in use");
    } else {
      let salt = bcrypt.genSaltSync(10);
      let hashedPassword = bcrypt.hashSync(password, salt);
      const user = await new User({ name, email, password: hashedPassword });
      const newUser = await user.save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "invalid cridentials" });
    }
    const userPassword = await bcrypt.compare(password, user.password);
    if (!userPassword) {
      res.status(400).json({ msg: "invalid cridentials" });
    }
    const token = await jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.cookie("token", token).json(user);
    //res.send("cookie sent");
    // res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json(error);
  }
};
