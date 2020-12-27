const sequelize = require('../db');
const Service = sequelize.model('service');

const create = (data, options = {}) => {
    return Service.create(data, options);
};

const update = (filter, changes, options = {}) => {
	const query = {
		where: filter,
        ...options,
	};

    return Service.update(changes, query);
};

const remove = (filter, options = {}) => {
	const query = {
        where: filter,
		raw: true,
        ...options,
	};

    return Service.destroy(query);
};

const find = (filter, options = {}) => {
	const query = {
        where: filter,
		raw: true,
        ...options,
    };

    return Service.findOne(query);
};

const findAll = (filter, options = {}) => {
	const query = {
        where: filter,
		raw: true,
        ...options,
    };

    return Service.findAll(query);
};

module.exports = {
	create,
	update,
    remove,
	findAll,
	find,
};
