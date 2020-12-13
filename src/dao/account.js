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

const update = (filter, changes, options = {}) => {
    const query = {
		where: filter,
        ...options,
    };

    return Account.update(changes, query);
};

module.exports = {
    find,
    create,
	count,
	update,
};
