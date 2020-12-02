const sequelize = require('../db');
const Customer = sequelize.model('customer');

const find = (filter) => {
    return Customer.findOne({
        where: filter,
        attributes: ['id', 'password'],
        raw: true,
    });
};

const count = (filter) => {
    return Customer.count({
        where: filter,
    });
};

const create = (data) => {
    return Customer.create(data);
};

module.exports = {
    find,
    create,
    count,
};
