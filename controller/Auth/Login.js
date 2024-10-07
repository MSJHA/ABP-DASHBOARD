const jwt = require('jsonwebtoken');
const User = require('../../models/UserModel');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Sessions = require('../../models/SessionModel');
const cookieParser = require('cookie-parser');


const app = express();
app.use(cookieParser());
const Secret_key= "w32tt3e3e11";

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user.id }, Secret_key, { expiresIn: '1h' });
  
      const session = await Sessions.create({
        sid: JSON.stringify(req.sessionID),
        user_id: user.id,
        token: token,
        started_at: new Date(), // Store as a Date object for easier handling
        expires_at: new Date(Date.now() + 1 * 60 * 60 * 1000), 
      });
  
      req.session.user = { id: user.id, email: user.email }; // Storing user info and session ID in session
      // Set cookies in the response headers
      res.cookie('userId', user.id);
      res.cookie('cookieId', session.id);  // Assuming you want to use the session ID
  
      res.json({ token, data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.login = login;


