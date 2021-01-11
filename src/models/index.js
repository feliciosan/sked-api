module.exports = (sequelize, DataTypes) => {
    const UserModel = require('./user');
    const AccountModel = require('./account');
    const TimegridModel = require('./timegrid');
    const ScheduleModel = require('./schedule');
    const CustomerModel = require('./customer');
    const ServiceModel = require('./service');
    const RecoverPasswordModel = require('./recover-password');
    const ScheduleLockModel = require('./schedule-lock');

    AccountModel(sequelize, DataTypes);
    UserModel(sequelize, DataTypes);
    CustomerModel(sequelize, DataTypes);
    TimegridModel(sequelize, DataTypes);
    ServiceModel(sequelize, DataTypes);
	ScheduleModel(sequelize, DataTypes);
	RecoverPasswordModel(sequelize, DataTypes);
	ScheduleModel(sequelize, DataTypes);
	RecoverPasswordModel(sequelize, DataTypes);
	ScheduleLockModel(sequelize, DataTypes);
};
