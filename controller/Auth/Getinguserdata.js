
const express = require('express');
const app = express();

const AbpUserModel= require('../../models/AbpUsers');
const AbpSessionHistory= require('../../models/AbpSessionHistory');

const cors = require('cors');
app.use(cors());

const getUserData = async (req, res) => {
    const id = Number(req.params.id);
    
    if (!id) {
        return res.status(401).json({ error: 'User ID not found in the request' });
      }
    try {
        const userGetData = await AbpUserModel.findOne({
            where: {
                id: id,
              },
              attributes: [
                'id', 'abp_uuid', 'ga_id', 'user_login_id', 'password', 'google_user_email', 'google_user_picture', 
                'registration_source', 'registration_by', 'registration_otp', 'registration_otp_verified', 'user_name', 
                'device_type', 'channel_name', 'first_name', 'middle_name', 'last_name', 'registration_date', 
                'account_verification_date', 'status', 'created_at', 'updated_at'
            ]   
        });
        if (userGetData.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const sessionData = await AbpSessionHistory.findAll({
            where: { 
                abp_user_id: id,
            },
            attributes: [
                'id',
                'abp_user_id',
                'created_at',
                'updated_at',
            ],
            order: [
                ['id', 'DESC'] 
            ]
        });
        

        return res.status(200).json(
             [userGetData , sessionData]
        );
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
    
    module.exports.getUserData = getUserData;

