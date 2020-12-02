const sequelize = require('../db');
const Schedule = sequelize.model('schedule');

const create = (data) => {
    return Schedule.create(data);
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

module.exports = {
    create,
    findAll,
	count,
	update,
};
