const { DataTypes } = require("sequelize");
const { sequelize2 } = require('../db');
const AbpUserModel = require("./AbpUsers");

const AbpSessionHistory = sequelize2.define('AbpSessionHistory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    abp_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    session_id: {
      type: DataTypes.STRING,
    },
    device_type: {
      type: DataTypes.STRING,
    },
    channel_name: {
      type: DataTypes.STRING,
    },
    last_login_date: {
      type: DataTypes.DATE,
    },
    host: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    user_agent: {
      type: DataTypes.STRING,
    },
    ip: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, 
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, 
    },
  },{
    tableName: 'abp_session_history',
    timestamps: false
});


// AbpSessionHistory.belongsTo(AbpUserModel, { foreignKey: 'abp_user_id' });

module.exports = AbpSessionHistory;
