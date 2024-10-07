const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel');

const assignrole = async (req, res) => {
  try {
    const { superadminEmail, idToPromote, newRole } = req.body;

    
    const superadmin = await User.findOne({ where: { email: superadminEmail, role: 'superadmin' } });
    if (!superadmin) {
      return res.status(404).json({ message: 'Superadmin not found' });
    }

  

    const validRoles = ['user','admin', 'developer', 'editor', 'testor', 'manager', 'hr', 'designer'];

    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    const [updatedRowsCount] = await User.update({ role: newRole }, { where: { id: idToPromote } });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`${newRole} role assigned to ${idToPromote}`);
    res.status(200).json({ message: `${newRole} role assigned to ${idToPromote}` });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.assignrole = assignrole;
