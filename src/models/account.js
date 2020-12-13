module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define(
        'account',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.TEXT
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

    Account.belongsTo(sequelize.models.user, {
        foreignKey: 'user_id',
        allowNull: false,
    });

    return Account;
};
