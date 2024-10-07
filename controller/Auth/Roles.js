const express = require('express');
const router = express.Router();
const Role = require('../../models/RolesModel');

const addRole = async (req, res) => {
  try {
    const { role_name, created_by } = req.body;

    const existingRole = await Role.findOne({ where: { role_name } });
    if (existingRole) {
      return res.status(409).json({ error: 'Role with the same name already exists' });
    }

    const role = await Role.create({
      role_name,
      created_by,
      created_at: new Date(), 
      status: 1 
    });

    res.json({ message: 'Role added successfully!', roleId: role.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add role to database' });
  }
};

module.exports = { addRole };
