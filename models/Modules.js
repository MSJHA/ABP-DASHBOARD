const { DataTypes } = require("sequelize");
const{ sequelize} = require('../db');

const Modules = sequelize.define('modules', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  module_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_by: {
    type: DataTypes.INTEGER, 
    allowNull: false
  },
  updated_by: {
    type: DataTypes.INTEGER, 
  },
  deleted_by: {
    type: DataTypes.INTEGER, 
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN, 
    allowNull: false,
    defaultValue: 1
  }
});

sequelize.sync();

module.exports = Modules;
