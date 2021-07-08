const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_shop', 'root', 'st34lthfr34k', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;