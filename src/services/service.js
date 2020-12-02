const ServiceDao = require('../dao/service');

const create = async ({ data }) => {
    await ServiceDao.create(data);

    return true;
};

const update = async ({ filter, changes }) => {
    await ServiceDao.update(filter, changes);

    return true;
};

const remove = async ({ filter }) => {
    await ServiceDao.remove(filter);

    return true;
};

const findAll = async ({ filter }) => {
    const services = await ServiceDao.findAll(filter, {
		attributes: ['id', 'name', 'duration', 'price', 'show_price'],
		order: [['created_at', 'DESC']],
	});

    return { services };
};

const findAllById = async ({ filter }) => {
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
    findAllById,
};
