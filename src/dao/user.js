const sequelize = require('../db');
const User = sequelize.model('user');

const find = (filter, options = {}) => {
	const query = {
        where: filter,
		raw: true,
        ...options,
	};

    return User.findOne(query);
};

const findAllByAccountId = (filter, options = {}) => {
	const query = {
        where: filter,
		raw: true,
        ...options,
	};

    return User.findAll(query);
};

const count = (filter, options = {}) => {
	const query = {
		where: filter,
        ...options,
	};

    return User.count(query);
};

const update = (filter, changes, options = {}) => {
    const query = {
		where: filter,
        ...options,
    };

    return User.update(changes, query);
};

const create = (data, options = {}) => {
    return User.create(data, options);
};

module.exports = {
    find,
    create,
	count,
	update,
	findAllByAccountId,
};
