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

const count = (userFilter) => {
    return User.count({
        where: userFilter,
    });
};

const create = (userBody) => {
    return User.create(userBody);
};

module.exports = {
    find,
    create,
    count,
};
