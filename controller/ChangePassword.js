const { where } = require("sequelize");
const User = require("../models/UserModel");
const { exist, isEmptyObject, emailValidationRegEx } = require("../utils/validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const changePassword = async (req, res) => {
    console.log("request received to change password for email:", req.body.email);
    try {
        // Extracting request
        const { email, oldPassword, newPassword, confirmPassword } = req.body;
    
        // Validations
        if (!exist(email)) throw new Error("Please provide email");
        if (!exist(oldPassword)) throw new Error("Please provide oldPassword");
        if (!exist(newPassword)) throw new Error("Please provide newPassword");
        if (!exist(confirmPassword)) throw new Error("Please provide confirmPassword");

        // Find account by email
        const user = await User.findOne({ email });
        if (!user || isEmptyObject(user)) throw new Error("Account with this email doesn't exist");

        if (newPassword !== confirmPassword) throw new Error("New password and confirm password are not matching");

        // Compare old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) throw new Error("Old password is wrong");

        // Encrypt new password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);

        // Update new password
        await User.update({ password: encryptedPassword }, { where: { email } });

        console.log("Password changed successfully");
        return res.status(200).json({ response: "SUCCESS", message: `Password changed successfully` });
    } catch (err) {
        console.log(`Error in changing password`, err);
        return res.status(500).json({ response: "FAILURE", message: `Error in changing password: ${err.message}` });
    }
}

module.exports.changePassword = changePassword;
