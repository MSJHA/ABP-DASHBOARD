const { DataTypes } = require("sequelize");
const { sequelize } = require('../db');

const Sessions = sequelize.define('sessions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    sid: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
    },
    started_at: {
      type: DataTypes.DATE, // Use DataTypes.DATE for storing date/time
    },
    expires_at: {
      type: DataTypes.DATE, // Use DataTypes.DATE for storing date/time
    },
  });

  Sessions.sync()

  module.exports = Sessions;