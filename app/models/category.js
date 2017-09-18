const Sequelize = require('sequelize');
const connection = require('./connection.js');
const Category = connection.define('categories', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    image: Sequelize.STRING,
    name: Sequelize.STRING
}, {
    timestamps: false
});

module.exports = Category;