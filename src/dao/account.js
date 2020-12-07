const sequelize = require('../db');
const Account = sequelize.model('account');

const find = (filter, options = {}) => {
	const query = {
        where: filter,
		raw: true,
        ...options,
	};

    return Account.findOne(query);
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
