const Sequelize = require('sequelize');
const config = require('../../config/database.js');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port || 3306,
    dialect: config.dialect,
    pool: {
        max: config.pullMax || 5,
        min: config.pullMin || 3,
        idle: config.pullIdle || 10000
    },
    logging: false
});

module.exports = sequelize;