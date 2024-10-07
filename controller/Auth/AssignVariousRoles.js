const { Op } = require('sequelize');
const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel');

// Function to check if a user is a superadmin or an admin
const isSuperAdminOrAdmin = async (email) => {
  const user = await User.findOne({ where: { email, role: { [Op.or]: ['superadmin', 'admin'] } } });
  return user ;
};

// Function to check if a user is a superadmin
const isSuperAdmin = async (email) => {
  const user = await User.findOne({ where: { email, role: 'superadmin' } });
  return user ;
};

// Endpoint to assign various roles by superadmins or admins
const assignVariousRoles = async (req, res) => {
  try {
    const { adminemail, idToAssignRole, newRole } = req.body;

    // Check if the user is a superadmin or admin
    const isAuthorized = await isSuperAdminOrAdmin(adminemail);
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized: Only superadmins or admins can assign roles' });
    }

    // Check if the new role is valid
    const validRoles = ['user', 'admin', 'developer', 'editor', 'testor', 'manager', 'hr', 'designer'];
    if (!validRoles.includes(newRole.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    // Find the user to update
    const userToUpdate = await User.findOne({ where: { id: idToAssignRole } });
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user to update is a superadmin
    const isUserToUpdateSuperAdmin = await isSuperAdmin(userToUpdate.email);
    const isAdminUpdatingSuperAdmin = await isSuperAdmin(adminemail);
    if (isUserToUpdateSuperAdmin && !isAdminUpdatingSuperAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Admins cannot change the role of superadmin' });
    }

    // Update the role of the specified user
    await userToUpdate.update({ role: newRole });

    console.log(`Role ${newRole} assigned to ${userToUpdate.name} (ID: ${idToAssignRole}) by ${adminemail}`);
    res.status(200).json({ message: `Role ${newRole} assigned to ${userToUpdate.name} (ID: ${idToAssignRole})` });
  } catch (error) {
    console.error('Error assigning role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  assignVariousRoles
};

