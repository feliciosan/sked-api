module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define(
        'schedule',
        {
            start: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            end: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            confirmed_at: {
                type: DataTypes.DATE,
            },
            canceled_at: {
                type: DataTypes.DATE,
            },
            finished_at: {
                type: DataTypes.DATE,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: 0
			},
        },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
        }
    );

    Schedule.belongsTo(sequelize.models.account, {
        foreignKey: 'account_id',
        allowNull: false,
    });

	Schedule.belongsTo(sequelize.models.user, {
        foreignKey: 'user_id',
        allowNull: false,
    });

    Schedule.belongsTo(sequelize.models.customer, {
        foreignKey: 'customer_id',
        allowNull: false,
    });

    Schedule.belongsTo(sequelize.models.service, {
        foreignKey: 'service_id',
        allowNull: false,
    });

    return Schedule;
};
