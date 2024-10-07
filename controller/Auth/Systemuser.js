const express = require('express');
const cors = require('cors');
const { Op } = require("sequelize");
const User = require('../../models/UserModel');

const router = express.Router();
const app = express();

app.use(express.json());
app.use(cors());

const systemUser = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 1;
    

    const startIndex = (page - 1) * limit;
    
    let nameCond = {};
    if (req.query.name) {
      let name = String(req.query.name);
      nameCond = { name: { [Op.like]: `%${name}%` } };
    }

    let emailCond = {};
    if (req.query.email) {
      let email = String(req.query.email);
      emailCond = { email: { [Op.like]: `%${email}%` } };
    }
    let  whereCondition={};
    if(req.query.name && req.query.email){
      whereCondition = { where: {
        [Op.or]: [
          
          { ...nameCond },
          { ...emailCond }
        ]
    }}
  }
    else if(req.query.name){
      whereCondition={where: [
        {...nameCond}
      ]}
    }
    else if(req.query.email){
      whereCondition={where:[
        {...emailCond}
      ]}
    }
    
    const users = await User.findAll({
      
      ...whereCondition,
      offset: startIndex,
      limit: limit,
    });

    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.systemUser = systemUser;
