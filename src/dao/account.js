const sequelize = require('../db');
const Account = sequelize.model('account');
const User = sequelize.model('user');

const find = (filter) => {
    return Account.findOne({
        where: filter,
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
        attributes: ['id', 'name'],
        raw: true,
        nest: true,
    });
};

const count = (filter) => {
    return Account.count({
        where: filter,
    });
};

const create = (data) => {
    return Account.create(data);
};

module.exports = {
    find,
    create,
    count,
};
