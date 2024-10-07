const { DataTypes } = require("sequelize");
const { sequelize } = require('../db');

const Roles_Modules = sequelize.define('roles_modules', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  module_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  timestamps: false 
});

sequelize.sync();

module.exports = Roles_Modules;
