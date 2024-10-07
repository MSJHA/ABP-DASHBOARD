const express = require('express');
const router = express.Router();
const Modules = require('../../models/Modules');
const Modules_url = require('../../models/Modules_url');


const moduledel = async (req, res) => {
  try {
    const { id } = req.params;
    const { deleted_by } = req.body; 
    const module = await Modules.findByPk(id);
    
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    await module.update({ deleted_at: new Date(), deleted_by,status:0 });
    
    const mod_url = await Modules_url.findAll({ where: { module_id: id } });
    await Promise.all(mod_url.map(url => url.update({ status:0  })));

    res.json({ message: 'Module soft deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to soft delete module from database' });
  }
};

module.exports = { moduledel };



