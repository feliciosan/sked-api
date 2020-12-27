const ServiceDao = require('../dao/service');

const create = async ({ data, transaction }) => {
    await ServiceDao.create(data, { transaction });

    return true;
};

const update = async ({ filter, changes, transaction }) => {
    await ServiceDao.update(filter, changes, { transaction });

    return true;
};

const remove = async ({ filter, transaction }) => {
    await ServiceDao.remove(filter, { transaction });

    return true;
};

const findAll = async ({ filter }) => {
    const services = await ServiceDao.findAll(filter, {
		attributes: ['id', 'name', 'duration', 'price', 'show_price'],
		order: [['created_at', 'DESC']],
	});

    return { services };
};

const findAllByAccountId = async ({ filter }) => {
    const servicesResult = await ServiceDao.findAll(filter);
    const services = {};

    servicesResult.forEach((service) => {
        services[service.id] = service;
    });

    return { services };
};

module.exports = {
	create,
	update,
    remove,
    findAll,
    findAllByAccountId,
};
