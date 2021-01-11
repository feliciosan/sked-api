module.exports = (sequelize, DataTypes) => {
    const ScheduleLock = sequelize.define(
        'schedule_lock',
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
        },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
        }
    );

    ScheduleLock.belongsTo(sequelize.models.account, {
        foreignKey: 'account_id',
        allowNull: false,
    });

	ScheduleLock.belongsTo(sequelize.models.user, {
        foreignKey: 'user_id',
        allowNull: false,
    });

    return ScheduleLock;
};
