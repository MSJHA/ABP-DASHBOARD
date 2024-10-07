const express = require('express');
const router = express.Router();
const Role = require('../../models/RolesModel');

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { deleted_by } = req.body; 
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    await role.update({ deleted_at: new Date(), deleted_by,status:0 });

    res.json({ message: 'Role soft deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to soft delete role from database' });
  }
};

module.exports = { deleteRole };



