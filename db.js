const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: '127.0.0.1',
  username: 'root',
  password: '',
  database: 'userdata',
});

const sequelize2 = new Sequelize({
  dialect: 'mysql',
  host: '127.0.0.1',
  username: 'root',
  password: '',
  database: 'abp_authdb',
});

module.exports = {
  sequelize,
  sequelize2
}
