const { DataTypes } = require("sequelize");
const{ sequelize} = require('../db');

const Roles = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role_name: {
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
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
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
}, {
  tableName: 'roles', 
  timestamps: false
});

sequelize.sync();

module.exports = Roles;
