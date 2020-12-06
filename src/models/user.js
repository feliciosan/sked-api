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
			telephone: {
                type: DataTypes.STRING,
				allowNull: false,
			},
			cpf_cnpj: {
                type: DataTypes.STRING,
				allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            pending: {
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

    return User;
};
