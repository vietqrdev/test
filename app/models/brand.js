const Sequelize = require('sequelize');
const connection = require('./connection.js');
const Organization = require('./organization.js');
const Brand = connection.define('brands', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    organization_id: Sequelize.INTEGER,
    logo: Sequelize.STRING,
    name: Sequelize.STRING
}, {
    timestamps: false
});

module.exports = Brand;