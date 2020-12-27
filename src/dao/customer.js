const sequelize = require('../db');
const Customer = sequelize.model('customer');

const find = (filter, options = {}) => {
	const query = {
        where: filter,
        raw: true,
        ...options,
	};

    return Customer.findOne(query);
};

const count = (filter, options = {}) => {
	const query = {
        where: filter,
		raw: true,
        ...options,
	};

    return Customer.count(query);
};

const create = (data, options = {}) => {
    return Customer.create(data, options);
};

const update = (filter, changes, options = {}) => {
    const query = {
		where: filter,
        ...options,
    };

    return Customer.update(changes, query);
};

module.exports = {
    find,
    create,
	count,
	update,
};
