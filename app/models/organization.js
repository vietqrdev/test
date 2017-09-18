const Sequelize = require('sequelize');
const connection = require('./connection.js');
const Organization = connection.define('organizations', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    logo: Sequelize.STRING,
    name: Sequelize.STRING,
    address: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    website: Sequelize.STRING,
    gln: Sequelize.STRING
}, {
    timestamps: false
});

module.exports = Organization;