module.exports = (sequelize, DataTypes) => {
    const UserModel = require('./user');
    const AccountModel = require('./account');
    const TimegridModel = require('./timegrid');
    const ScheduleModel = require('./schedule');
    const CustomerModel = require('./customer');
    const ServiceModel = require('./service');

    UserModel(sequelize, DataTypes);
    AccountModel(sequelize, DataTypes);
    CustomerModel(sequelize, DataTypes);
    TimegridModel(sequelize, DataTypes);
    ServiceModel(sequelize, DataTypes);
	ScheduleModel(sequelize, DataTypes);
};
