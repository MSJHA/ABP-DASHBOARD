const express = require('express');
const router = express.Router();
const Role = require('../../models/RolesModel');

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_name, updated_by } = req.body;

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    if (role_name && role.role_name !== role_name) {
      role.role_name = role_name;
    }

    role.updated_by = updated_by;

    role.updated_at = new Date();

    await role.save();

    res.json({ message: 'Role updated successfully!', role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update role in database' });
  }
};

module.exports = { updateRole };
