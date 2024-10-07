const express = require('express');
const cors = require('cors');
const { Op } = require("sequelize");
const Modules = require('../../models/Modules');
const router = express.Router();
const app = express();

app.use(express.json());
app.use(cors());

const modulesearch = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10; // Changed the default limit to 10 for better UI experience

    const startIndex = (page - 1) * limit;

    let moduleCond = {
      deleted_by: null // Filter out roles with deleted_by not set
    };
    if (req.query.module_name) {
      let module_name = String(req.query.module_name);
      moduleCond = { ...moduleCond, module_name: { [Op.like]: `%${module_name}%` } };
    }

    const modules = await Modules.findAll({
      where: moduleCond,
      offset: startIndex,
      limit: limit,
    });

    return res.json(modules);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.modulesearch = modulesearch;
