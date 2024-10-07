const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel');
const Sessions = require('../../models/SessionModel');

const logout = async (req, res) => {
  try {
    const sessionId = req.sessionID;
    const cookieId = req.cookies.cookieId;
    const userId = req.cookies.userId;
    // Delete the session from the database
    const response = await Sessions.destroy({
      where: {
        id: cookieId,
        user_id: userId
      },
    });
    console.log(response);
    // Destroy the session to log the user out
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Clear local storage
        res.clearCookie('cookieId');
        res.clearCookie('userId');
        res.clearCookie('connect.sid');
        res.clearCookie('toastShown');
        // Send response indicating successful logout
        return res.status(200).json({ success: true, sessionId });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.logout = logout;
