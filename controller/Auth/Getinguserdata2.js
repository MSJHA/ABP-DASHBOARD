
const express = require('express');
const app = express();

const AbpSessionHistory= require('../../models/AbpSessionHistory');

const cors = require('cors');
app.use(cors());

const getUserSessionData = async (req, res) => {
    console.log(req.params.id);
   
    const id = Number(req.params.id);
 
    // const sessionCount = await AbpSessionHistory.count({
    //     where: { abp_user_id: abp_user_id }
    // });

    if (!id) {
        return res.status(401).json({ error: 'User ID not found in the request' });
    }
    try {
        // SELECT count(id) FROM abp_session_history where abp_user_id=2;
        const sessionData = await AbpSessionHistory.count({
            where: { 
               abp_user_id: id,
             },
            attributes: [
                'id',
                'abp_user_id',
                'created_at',
                'updated_at'
            ]
        });
        
        if (sessionData.length === 0) {
            return res.status(404).json({ error: 'No sessions found for the user' });
        }
      console.log(sessionData);
      console.log("hi");
        return res.status(200).json(sessionData);
    } catch (error) {
        // console.error('Error fetching user session data:', error);
        return res.status(500).json({ error: 'Internal server error ' });
    }
};
module.exports.getUserSessionData= getUserSessionData;