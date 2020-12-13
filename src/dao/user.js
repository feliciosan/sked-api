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

const count = (filter) => {
    return User.count({
        where: filter,
    });
};

const update = (filter, changes, options = {}) => {
    const query = {
		where: filter,
        ...options,
    };

    return User.update(changes, query);
};

const create = (data) => {
    return User.create(data);
};

module.exports = {
    find,
    create,
	count,
	update,
};
