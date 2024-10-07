const express = require('express');
const router = express.Router();
const RoleModule = require('../../models/Roles_Modules');

const mulroleid = async (req, res) => {
  try {
    const { role_id, modules } = req.body;

    const newRoleModules = [];

    const existingRoleModules = await RoleModule.findAll({ where: { role_id } });
    for (const existingRoleModule of existingRoleModules) {
      if (!modules.includes(existingRoleModule.module_id)) {
        await existingRoleModule.destroy();
        console.log(`Deleted role module entry for role ${role_id} and module ${existingRoleModule.module_id}`);
      }
    }

    for (const module_id of modules) {
      const existingRoleModule = await RoleModule.findOne({ where: { role_id, module_id } });
      if (existingRoleModule) {
        console.log(`Skipping module ${module_id} for role ${role_id}: Duplicate entry already exists`);
        continue;
      }

      const newRoleModule = await RoleModule.create({ role_id, module_id });
      newRoleModules.push(newRoleModule);
    }

    res.status(201).json(newRoleModules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { mulroleid };
