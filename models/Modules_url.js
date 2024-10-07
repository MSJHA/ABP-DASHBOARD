const { DataTypes } = require("sequelize");
const { sequelize } = require('../db');

const Modules_url = sequelize.define('modules_url', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  module_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  module_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN, 
    allowNull: false,
    defaultValue: 1
  }
}, {
  timestamps: false 
});

sequelize.sync();

module.exports = Modules_url;
