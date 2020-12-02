module.exports = (sequelize, DataTypes) => {
    const Timegrid = sequelize.define(
        'timegrid',
        {
            day: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            start: {
                type: DataTypes.TIME,
            },
            end: {
                type: DataTypes.TIME,
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

    Timegrid.belongsTo(sequelize.models.user, {
        foreignKey: 'user_id',
        allowNull: false,
    });

    Timegrid.belongsTo(sequelize.models.account, {
        foreignKey: 'account_id',
        allowNull: false,
    });

    return Timegrid;
};
