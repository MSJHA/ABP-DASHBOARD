const { DataTypes } = require("sequelize");
const { sequelize } = require('../db');
const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactNO: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fatherName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    motherName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    education: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING, 
        defaultValue: 'user'
    }
});

User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

User.sync();
module.exports = User;
