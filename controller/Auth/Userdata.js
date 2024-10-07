

const express = require('express');
const app = express();

const User = require('../../models/UserModel');
const cors = require('cors');
app.use(cors());


const userdata = async (req, res) => {
  const id = Number(req.query.id);

  if (!id) {
    return res.status(401).json({ error: 'User ID not found in the request' });
  }
  const userInfo = await User.findOne({
    where: {
      id: id,
    },
    attributes: ['id', 'name', 'email', 'contactNO', 'createdAt','fatherName','motherName'],
  });

  if (!userInfo) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json(userInfo);
}





module.exports.userdata = userdata;