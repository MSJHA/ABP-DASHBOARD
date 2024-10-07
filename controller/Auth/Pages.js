const express = require('express');
const cors = require('cors');
const { Op } = require("sequelize");
const User = require('../../models/UserModel');
const { sequelize2 } = require("../../db");
const { Sequelize } = require('sequelize');
const AbpUserModel = require("../../models/AbpUsers")

const router = express.Router();
const app = express();

app.use(express.json());
app.use(cors());
// console.log("hi");
const maskEmail = (email) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.slice(0,1) + '*'.repeat(username.length - 1) ;
    const maskedDomain=  '*'.repeat(domain.length - 2) + domain.slice(-1);
    return maskedUsername +'@' + maskedDomain;
};
const maskName = (name) => {
    if (name.length <= 2) return name[0] + '*';
    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1]; 
};


const pages = async (req, res) => {
    try {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 1;
        const startIndex = (page - 1) * limit;
        let whereCondition = {};

        if (req.query.name) {
            let name = String(req.query.name);
            whereCondition["user_name"] = { [Op.like]: `%${name}%` };
        }
        if (req.query.email) {
            let email = String(req.query.email);
            whereCondition["google_user_email"] = { [Op.like]: `%${email}%` };
        }
        if (req.query.loginId) {
            let loginId = String(req.query.loginId);
            whereCondition["user_login_id"] = { [Op.like]: `%${loginId}%` };
        }
        if (req.query.deviceType) {
            let deviceType = String(req.query.deviceType);
            whereCondition["device_type"] = {  [Op.like]: `%${deviceType}%` };
        }
        if (req.query.channelName) {
            let channelName = String(req.query.channelName);
            whereCondition["channel_name"] = { [Op.like]: `%${channelName}%` };
        }

        let options = {
            offset: startIndex,
            limit: limit
        };

        if (Object.keys(whereCondition).length > 0) {
            options.where = { ...whereCondition };
        }

        const users = await AbpUserModel.findAll(options);

        // Masking email  and name
        const maskedUsers = users.map(user => {
           
            return {
                ...user.dataValues,

                google_user_email: maskEmail(user.google_user_email),
                user_name: maskName(user.user_name)
            };
        });

        const count = await AbpUserModel.count({
            where: { ...whereCondition }
        });

        return res.json({ users:maskedUsers, totalUser: count });
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
   
};

module.exports.pages = pages;



