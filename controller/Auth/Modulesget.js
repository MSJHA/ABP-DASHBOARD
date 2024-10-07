const express = require('express');
const router = express.Router();
const Modules = require('../../models/Modules');
const Modules_url = require('../../models/Modules_url');

const getModule = async (req, res) => {
  try {
    const { moduleId } = req.params;

    const module = await Modules.findOne({ where: { id: moduleId } });

    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    const moduleUrls = await Modules_url.findAll({
      where: { module_id: moduleId, status: 1 } 
    });

    const responseData = {
      module_name: module.module_name,
      module_urls: moduleUrls.map(url => url.module_url),
      updated_by: module.updated_by
    };

    res.json({ module: responseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch module data' });
  }
};

module.exports = { getModule };
