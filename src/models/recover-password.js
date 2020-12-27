module.exports = (sequelize, DataTypes) => {
    const RecoverPassword = sequelize.define(
        'recover_password',
        {
            token: {
                type: DataTypes.TEXT,
                allowNull: false,
			}
        },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
        }
	);

	RecoverPassword.belongsTo(sequelize.models.user, {
        foreignKey: 'user_id',
	});

	RecoverPassword.belongsTo(sequelize.models.customer, {
        foreignKey: 'customer_id',
    });

    return RecoverPassword;
};
