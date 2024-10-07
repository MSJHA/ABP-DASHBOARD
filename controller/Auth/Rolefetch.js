const express = require('express');
const cors = require('cors');
const Role = require('../../models/RolesModel');
const app = express();
app.use(express.json());
app.use(cors());

const totalRoleSystem = async (req, res) => {
  try {
    
    const page = req.query.page || 1;

    const recordsPerPage = 8;
    const totalCount = await Role.count();

    const response = {
      totalCount,
      recordsPerPage,
      currentPage: page, 
    };

    
    res.json(response);
  } catch (err) {
    
    res.status(500).json({ error: err.message });
  }
};

module.exports.totalRoleSystem = totalRoleSystem;