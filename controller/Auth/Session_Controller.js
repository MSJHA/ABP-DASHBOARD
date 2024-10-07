const session = require('express-session');
const express =require('express');
const router = express.Router();

const sessioncontroller = async (req, res) => {
    try {
      if (req.session && req.session.user) {
        const user = req.session.user;
        return res.status(200).json({ loggedIn: true, user });
      } else {
        return res.status(401).json({ loggedIn: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };



  module.exports.sessioncontroller = sessioncontroller;