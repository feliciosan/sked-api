module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
			},
			cpf: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            pending: {
                type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			is_root: {
                type: DataTypes.BOOLEAN,
				allowNull: false,
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

	User.belongsTo(sequelize.models.account, {
        foreignKey: 'account_id',
		allowNull: false,
    });

    return User;
};
