const express = require('express');
const router = express.Router();
const Modules = require('../../models/Modules');
const Modules_url = require('../../models/Modules_url');

const addModule = async (req, res) => {
  try {
    const { module_name, module_urls, created_by } = req.body;

    const existingModule = await Modules.findOne({ where: { module_name } });
    if (existingModule) {
      return res.status(409).json({ error: 'Module with the same name already exists' });
    }

    const module = await Modules.create({
      module_name,
      created_by,
      created_at: new Date(),
      status: 1
    });

    const createdUrls = [];
    for (const url of module_urls) {
      const moduleUrl = await Modules_url.create({
        module_id: module.id,
        module_url: url,
        status: 1
      });
      createdUrls.push(moduleUrl);
    }

    res.json({ message: 'Module added successfully!', moduleId: module.id, urls: createdUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add module to database' });
  }
};

module.exports = { addModule };
