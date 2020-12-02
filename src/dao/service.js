const sequelize = require('../db');
const Service = sequelize.model('service');

const create = (data) => {
    return Service.create(data);
};

const update = (filter, changes) => {
    return Service.update(changes, {
		where: filter,
	});
};

const remove = (filter) => {
    return Service.destroy({
        where: filter,
    });
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
