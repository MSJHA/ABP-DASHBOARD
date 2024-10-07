const express = require('express');
const router = express.Router();
const Modules = require('../../models/Modules');
const Modules_url = require('../../models/Modules_url');
const { Sequelize, DataTypes } = require('sequelize');
const { Op } = Sequelize;

const editModule = async (req, res) => {
  try {
    const { moduleId } = req.params; 
    const { module_name, module_urls, updated_by } = req.body;

    const module = await Modules.findOne({ where: { id: moduleId } });
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    module.module_name = module_name;
    module.updated_by = updated_by;
    await module.save();

    await Modules_url.destroy({ where: { module_id: moduleId } });

    const createdUrls = [];
    for (const url of module_urls) {
      const moduleUrl = await Modules_url.create({
        module_id: moduleId,
        module_url: url,
        status: 1
      });
      createdUrls.push(moduleUrl);
    }

    // Send moduleData in the response
    const moduleData = { module_name, module_urls, updated_by }; 
    res.json({ message: 'Module updated successfully!', moduleId: moduleId, urls: createdUrls, moduleData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update module' });
  }
};

module.exports = { editModule };
