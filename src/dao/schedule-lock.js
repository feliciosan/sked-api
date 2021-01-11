const sequelize = require('../db');
const ScheduleLock = sequelize.model('schedule_lock');

const create = (data, options = {}) => {
    return ScheduleLock.create(data, options);
};

const findAll = (filter, options = {}) => {
    const query = {
        where: filter,
		raw: true,
        ...options,
    };

    return ScheduleLock.findAll(query);
};

const count = (filter, options = {}) => {
    const query = {
		where: filter,
        ...options,
    };

    return ScheduleLock.count(query);
};

const update = (filter, changes, options = {}) => {
    const query = {
		where: filter,
        ...options,
    };

    return ScheduleLock.update(changes, query);
};

const remove = (filter, options = {}) => {
	const query = {
        where: filter,
		raw: true,
        ...options,
	};

    return ScheduleLock.destroy(query);
};

module.exports = {
    create,
    findAll,
	update,
	remove,
	count,
};
