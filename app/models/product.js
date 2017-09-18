const Sequelize = require('sequelize');
const connection = require('./connection.js');
const Product = connection.define('products', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    gtin: Sequelize.STRING,
    image: Sequelize.STRING,
    name: Sequelize.STRING,
    price: Sequelize.BIGINT,
    manufacturer_id: Sequelize.INTEGER,
    category_id: Sequelize.INTEGER
}, {
    timestamps: false
});

module.exports = Product;