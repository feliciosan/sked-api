const sequelize = require('../db');
const moment = require('moment');
const ScheduleLockService = require('../services/schedule-lock');
const { handleResponse, handleError } = require('../services/handle-response');

const create = async (req, res) => {
	const transaction = await sequelize.transaction();

    try {
        const params = {
            data: {
                date: moment(req.body.date).toISOString(),
                start: req.body.start,
                end: req.body.end,
                account_id: req.user.account_id,
                user_id: req.user.id,
			},
			transaction
		};

		const response = await ScheduleLockService.create(params);
		await transaction.commit();

        handleResponse(res, 200, response);
    } catch (error) {
		await transaction.rollback();
        handleError(req, res, error);
    }
};

const findAll = async (req, res) => {
    try {
        const params = {
            filter: {
				user_id: req.user.id,
				account_id: req.user.account_id,
			},
        };

        handleResponse(res, 200, await ScheduleLockService.findAll(params));
    } catch (error) {
        handleError(req, res, error);
    }
};

const update = async (req, res) => {
	const transaction = await sequelize.transaction();

    try {
		const params = {
            filter: {
                id: req.params.id,
                user_id: req.user.id,
                account_id: req.user.account_id,
			},
			changes: {
				date: moment(req.body.date).toISOString(),
                start: req.body.start,
                end: req.body.end,
			},
			transaction
		};

		const response = await ScheduleLockService.update(params);
		await transaction.commit();

        handleResponse(res, 200, response);
    } catch (error) {
		await transaction.rollback();
        handleError(req, res, error);
    }
};

const remove = async (req, res) => {
	const transaction = await sequelize.transaction();

    try {
        const params = {
            filter: {
                id: req.params.id,
                user_id: req.user.id,
                account_id: req.user.account_id,
			},
			transaction
		};

		const response = await ScheduleLockService.remove(params);
		await transaction.commit();

        handleResponse(res, 200, response);
    } catch (error) {
		await transaction.rollback();
        handleError(req, res, error);
    }
};

module.exports = {
    create,
    findAll,
	update,
	remove,
};
