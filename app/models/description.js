const Sequelize = require('sequelize');
const connection = require('./connection.js');
const Description = connection.define('descriptions', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    description_type: Sequelize.STRING,
    description_id: Sequelize.INTEGER,
    title: Sequelize.STRING,
    body: Sequelize.STRING
}, {
    timestamps: false
});

module.exports = Description;