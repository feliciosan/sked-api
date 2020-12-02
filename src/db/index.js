const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../../config');
const defineModels = require('../models');

const sequelize = new Sequelize(db.name, db.user, db.password, {
    host: db.host,
    dialect: db.dialect,
    port: db.port,
    logging: false,
});

defineModels(sequelize, DataTypes);

module.exports = sequelize;
