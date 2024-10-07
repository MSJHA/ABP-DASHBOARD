const express = require('express');
const router = express.Router();
const RolesModel = require('../../models/RolesModel'); // Import the Role model
const Role_Modules = require('../../models/Roles_Modules'); // Import the Role_Module model
const Modules = require('../../models/Modules'); // Import the Module model

const getRoleModules = async (req, res) => {
  try {
    const { roleId } = req.params;

    // Find the role by ID
    const role = await RolesModel.findOne({ where: { id: roleId } });

    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    // Find all modules associated with the role
    const roleModules = await Role_Modules.findAll({
      where: { role_id: roleId }
    });

    // Extract module IDs from the roleModules
    const moduleIds = roleModules.map(roleModule => roleModule.module_id);

    console.log('Module IDs:', moduleIds);

    // Find modules based on module IDs
    const modules = await Modules.findAll({
      where: { id: moduleIds },
      attributes: ['id', 'module_name']
    });

    console.log('Modules:', modules);

    // Create an array of objects containing module ID and name
    const moduleData = modules.map(module => ({
      id: module.id,
      name: module.module_name
    }));

    console.log('Module Data:', moduleData);

    // Send the response with role ID and module data
    res.json({ role_id: roleId, modules: moduleData });
  } catch (error) {
    console.error('Error fetching role modules:', error);
    res.status(500).json({ error: 'Failed to fetch role modules' });
  }
};

module.exports = { getRoleModules };

