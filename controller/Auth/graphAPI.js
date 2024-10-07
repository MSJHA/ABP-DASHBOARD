const express = require('express');
const router = express.Router();
const AbpSessionHistory = require("../../models/AbpSessionHistory");
const AbpUserModel = require("../../models/AbpUsers");

const graphAPI = async (req, res) => {
  try {
    const { user_login_id } = req.params;
    const userData = await AbpUserModel.findOne({
      where: {
        user_login_id: user_login_id
      },
    });

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userSessionHistory = await AbpSessionHistory.findAll({
      where: {
        abp_user_id: userData['id'],
      },
      attributes: ['session_id', 'device_type', 'channel_name', 'last_login_date', 'host', 'url', 'user_agent', 'ip', 'created_at', 'updated_at']
    });

    if (!userSessionHistory || userSessionHistory.length === 0) {
      return res.status(404).json({ error: 'Session history not found' });
    }

    const totalLoginCount = userSessionHistory.length;

    res.json({ userData, userSessionHistory, totalLoginCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.graphAPI = graphAPI;
