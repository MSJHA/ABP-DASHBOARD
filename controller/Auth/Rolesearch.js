const express = require('express');
const cors = require('cors');
const { Op } = require("sequelize");
const Role = require('../../models/RolesModel');
const router = express.Router();
const app = express();

app.use(express.json());
app.use(cors());

const systemRoleSearch = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10; 

    const startIndex = (page - 1) * limit;

    let roleCond = {
      deleted_by: null 
    };
    if (req.query.role_name) {
      let roleName = String(req.query.role_name);
      roleCond = { ...roleCond, role_name: { [Op.like]: `%${roleName}%` } };
    }

    const roles = await Role.findAll({
      where: roleCond,
      offset: startIndex,
      limit: limit,
    });

    return res.json(roles);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.systemRoleSearch = systemRoleSearch;
