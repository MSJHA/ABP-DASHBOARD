const { sequelize2 } = require("../db");
const { DataTypes } = require("sequelize");

// Define the Sequelize model for AbpUser
const AbpUserModel = sequelize2.define('AbpUser', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    abp_uuid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ga_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_login_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    google_user_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    google_user_picture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registration_source: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registration_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    registration_otp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    registration_otp_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    device_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    channel_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    middle_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    registration_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    account_verification_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'abp_users',
    timestamps: false
});

module.exports = AbpUserModel;