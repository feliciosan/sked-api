const ScheduleLockDao = require('../dao/schedule-lock');
const { handleException } = require('../utils');
const { Op } = require('sequelize');

const create = async ({ data, transaction }) => {
	const lockUnavailable = await ScheduleLockDao.count({
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
	});

	if (lockUnavailable) {
		throw handleException('LOCK_UNAVAILABLE');
	}

	await ScheduleLockDao.create(data, { transaction });

    return true;
};

const findAll = async ({ filter }) => {
    const scheduleLocks = await ScheduleLockDao.findAll(filter, {
        order: [['date', 'DESC']],
	});

    return { schedule_locks: scheduleLocks };
};

const update = async ({ filter, changes, transaction }) => {
    await ScheduleLockDao.update(filter, changes, { transaction });

    return true;
};

const remove = async ({ filter, transaction }) => {
    await ScheduleLockDao.remove(filter, { transaction });

    return true;
};

module.exports = {
    create,
    findAll,
	update,
	remove,
};
