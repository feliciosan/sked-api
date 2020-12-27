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

const count = (filter, options = {}) => {
	const query = {
		where: filter,
        ...options,
	};

    return Account.count(query);
};

const create = (data, options = {}) => {
    return Account.create(data, options);
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
