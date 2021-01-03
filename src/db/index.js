const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../../config');
const defineModels = require('../models');

const sequelize = new Sequelize(db.database_url, {
	dialect:  'postgres',
	protocol: 'postgres',
	logging: false,
	dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

defineModels(sequelize, DataTypes);

module.exports = sequelize;
