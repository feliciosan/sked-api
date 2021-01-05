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

const create = async ({ data, transaction }) => {
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
		user_id: data.user_id,
		date: data.date,
		canceled_at: null,
	});

	if (slotUnavailable) {
		throw handleException('SLOT_UNAVAILABLE');
	}

	const service = await ServiceDao.find({
		id: data.service_id,
		account_id: data.account_id,
		user_id: data.user_id,
	}, {
		attributes: ['price']
	});

	data.price = service.price;

	await ScheduleDao.create(data, { transaction });

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
			attributes: ['name', 'url'],
		}, {
			model: sequelize.model('user'),
			attributes: ['name'],
		}],
        order: [['start', 'ASC']],
        nest: true,
	});

    return { schedules };
};

const updateStatus = async ({ filter, meta, transaction }) => {
	if (meta.status === 'CANCELED') {
		return await updateStatusCanceled({ filter, transaction});
	}

	if (meta.status === 'FINISHED') {
		return await updateStatusFinished({ filter, transaction});
	}

	if (meta.status === 'CONFIRMED') {
		return await updateStatusConfirmed({ filter, transaction});
	}

    throw handleException('STATUS_NOT_FOUND');
};

const updateStatusCanceled = async ({ filter, transaction }) => {
	const changes = {
		canceled_at: moment().format(),
	};

	const isFinished = await ScheduleDao.count({
		finished_at: {
			[Op.ne]: null,
		},
		...filter,
	});

	if (isFinished) {
		throw handleException('SCHEDULE_FINISHED');
	}

    await ScheduleDao.update({
		canceled_at: null,
		finished_at: null,
		...filter,
	}, changes, { transaction });

    return true;
};

const updateStatusFinished = async ({ filter, transaction }) => {
	const changes = {
		finished_at: moment().format(),
	};

	const isCanceled = await ScheduleDao.count({
		canceled_at: {
			[Op.ne]: null,
		},
		...filter,
	});

	if (isCanceled) {
		throw handleException('SCHEDULE_CANCELED');
	}

	await ScheduleDao.update({
		finished_at: null,
		canceled_at: null,
		...filter
	}, changes, { transaction });

    return true;
};

const updateStatusConfirmed = async ({ filter, transaction }) => {
	const changes = {
		confirmed_at: moment().format(),
	};

	const isCanceledOrFinished= await ScheduleDao.count({
		[Op.or]: [{
			canceled_at: {
				[Op.ne]: null,
			},
		}, {
			finished_at: {
				[Op.ne]: null,
			},
		}],
		...filter,
	});

	if (isCanceledOrFinished) {
		throw handleException('SCHEDULE_CANCELED_OR_FINISHED');
	}

	await ScheduleDao.update({
		canceled_at: null,
		finished_at: null,
		confirmed_at: null,
		...filter
	}, changes, { transaction });

    return true;
};

module.exports = {
    create,
    findAll,
	findCustomerSchedules,
	updateStatusCanceled,
	updateStatusFinished,
	updateStatusConfirmed,
	updateStatus,
};
