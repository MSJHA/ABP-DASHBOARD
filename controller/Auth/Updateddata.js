const express = require('express');
const cors = require('cors');
const { Op } = require("sequelize");
const User = require('../../models/UserModel');
const router = express.Router();
const app = express();

app.use(express.json());
app.use(cors());

const updateddata = async (req, res) => {
  const formInputData = req.body;
  const id = Number(req.query.id);

  if (!id) {
    return res.status(401).json({ error: 'User ID not found in the request' });
  }
  let userdata = {};
  userdata.name=formInputData.name;
  userdata.email=formInputData.email;
  userdata.contactNO=formInputData.contactNO;
  userdata.fatherName=formInputData.fatherName;
  userdata.motherName=formInputData.motherName;
  userdata.education=formInputData.education;
  await User.update(userdata, {
    where: {
      id: id,
    }
  });
    res.status(200).json({ message: 'User updated successfully' });
  
   
}
module.exports.updateddata = updateddata;