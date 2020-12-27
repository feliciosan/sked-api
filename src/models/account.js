module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define(
        'account',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
			},
			cpf_cnpj: {
                type: DataTypes.STRING,
				allowNull: false,
            },
            address: {
                type: DataTypes.TEXT
			},
			telephone: {
                type: DataTypes.STRING,
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

    return Account;
};
