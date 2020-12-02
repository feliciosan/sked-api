const sequelize = require('../db');
const ScheduleDao = require('../dao/schedule');
const ServiceDao = require('../dao/service');
const moment = require('moment');
const { Op } = require('sequelize');
const { handleException } = require('../utils');

const statusFilter = {
	'SCHEDULED': {
		canceled_at: null,
		finished_at: null,
	},
	'CANCELED': {
		canceled_at: {
			[Op.ne]: null,
		},
	},
	'FINISHED': {
		finished_at: {
			[Op.ne]: null,
		},
	},
};

const create = async ({ data }) => {
	const slotUnavailable = await ScheduleDao.count({
		[Op.or]: [{
			start: {
				[Op.gte]: data.start,
				[Op.lt]: data.end,
			}
		}, {
			end: {
				[Op.gt]: data.start,
				[Op.lte]: data.end,
			}
		}, {
			start: {
				[Op.lte]: data.start,
			},
			end: {
				[Op.gte]: data.end,
			}
		}],
		account_id: data.account_id,
		date: data.date,
		canceled_at: null,
	});

	if (slotUnavailable) {
		throw handleException('SLOT_UNAVAILABLE');
	}

	const service = await ServiceDao.find({
		id: data.service_id,
		account_id: data.account_id,
	}, {
		attributes: ['price']
	});

	data.price = service.price;

	await ScheduleDao.create(data);

    return true;
};

const findAll = async ({ filter, meta }) => {
    const schedules = await ScheduleDao.findAll({ ...filter, ...statusFilter[meta.status] }, {
		include: [{
			model: sequelize.model('customer'),
			attributes: ['name', 'telephone'],
		}, {
			model: sequelize.model('service'),
			attributes: ['name'],
			paranoid: false,
		}],
        order: [['start', 'ASC']],
		nest: true,
	});

    return { schedules };
};

const findCustomerSchedules = async ({ filter, meta }) => {
    const schedules = await ScheduleDao.findAll({ ...filter, ...statusFilter[meta.status] }, {
		include: [{
			model: sequelize.model('service'),
			attributes: ['name'],
		}, {
			model: sequelize.model('account'),
			attributes: ['name'],
			include: [{
				model: sequelize.model('user'),
				attributes: ['name'],
			}],
		}],
        order: [['start', 'ASC']],
        nest: true,
	});

    return { schedules };
};

const updateStatus = async ({ filter, meta }) => {
	const changes = {}

	if (meta.status === 'CANCELED') {
		filter.finished_at = null;
		changes.canceled_at = moment().format();
	}

	if (meta.status === 'FINISHED') {
		filter.canceled_at = null;
		changes.finished_at = moment().format();
	}

	if (meta.status === 'CONFIRMED') {
		filter.canceled_at = null;
		filter.finished_at = null;
		changes.confirmed_at = moment().format();
	}

    await ScheduleDao.update(filter, changes);

    return true;
};

module.exports = {
    create,
    findAll,
    findCustomerSchedules,
    updateStatus,
};
