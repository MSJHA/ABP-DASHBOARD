const express = require('express');
const cors = require('cors');
const { Op } = require("sequelize");
const User = require('../../models/UserModel');
const router = express.Router();
const app = express();

app.use(express.json());
app.use(cors());

const fetchingdata = async (req, res) => {
  const id = Number(req.query.id);

  if (!id) {
    return res.status(401).json({ error: 'User ID not found in the request' });
  }
    const userfetch = await User.findOne({ 
      where: {
        id: id,
      },
    attributes: ['id', 'name', 'email', 'contactNO', 'createdAt','fatherName','motherName','education'],
  
});

    if (!userfetch) {
      res.status(404).json({ error: 'User not found' });
      return;
    } 
      res.json(userfetch);
    
  

}

module.exports.fetchingdata = fetchingdata;