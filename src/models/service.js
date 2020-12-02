module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define(
        'service',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            duration: {
                type: DataTypes.INTEGER,
                allowNull: false,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: 0
			},
			show_price: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true
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

    Service.belongsTo(sequelize.models.user, {
        foreignKey: 'user_id',
        allowNull: false,
    });

    Service.belongsTo(sequelize.models.account, {
        foreignKey: 'account_id',
        allowNull: false,
    });

    return Service;
};
