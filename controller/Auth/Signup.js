const express =require('express');
const router = express.Router();
const User= require('../../models/UserModel')

const signup= async (req, res) => {
    try {
      const { name, contactNO, email, password } = req.body;
      const user = await User.create({ name, contactNO, email, password });
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports.signup = signup;