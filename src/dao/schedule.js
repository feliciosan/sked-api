const sequelize = require('../db');
const Schedule = sequelize.model('schedule');

const create = (data, options = {}) => {
    return Schedule.create(data, options);
};

const findAll = (filter, options = {}) => {
    const query = {
        where: filter,
		raw: true,
        ...options,
    };

    return Schedule.findAll(query);
};

const count = (filter, options = {}) => {
    const query = {
		where: filter,
        ...options,
    };

    return Schedule.count(query);
};

const update = (filter, changes, options = {}) => {
    const query = {
		where: filter,
        ...options,
    };

    return Schedule.update(changes, query);
};

const find = (filter, options = {}) => {
	const query = {
        where: filter,
		raw: true,
        ...options,
    };

    return Schedule.findOne(query);
};

module.exports = {
    create,
    findAll,
	count,
	update,
	find,
};
