const sequelize = require('../db');
const Timegrid = sequelize.model('timegrid');

const bulk = (data, options = {}) => {
    return Timegrid.bulkCreate(data, options);
};

const remove = (filter, options = {}) => {
	const query = {
		where: filter,
        ...options,
	};

    return Timegrid.destroy(query);
};

const findAll = (filter, options = {}) => {
	const query = {
		where: filter,
		attributes: ['day', 'start', 'end'],
        order: [['start', 'ASC']],
        raw: true,
        ...options,
	};

    return Timegrid.findAll(query);
};

module.exports = {
    bulk,
    remove,
    findAll,
};
