const moment = require('moment');
const ScheduleService = require('../services/schedule');
const { handleResponse, handleError } = require('../services/handle-response');
const sequelize = require('../db');

const create = async (req, res) => {
	const transaction = await sequelize.transaction();

    try {
        const params = {
            data: {
                date: moment(req.body.date).format(),
                start: req.body.start,
                end: req.body.end,
                account_id: req.body.account_id,
                service_id: req.body.service_id,
                user_id: req.body.user_id,
                customer_id: req.customer.id,
			},
			transaction
		};

		const response = await ScheduleService.create(params);
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
				date: req.query.date,
			},
			meta: {
				status: req.query.status,
			},
        };

        handleResponse(res, 200, await ScheduleService.findAll(params));
    } catch (error) {
        handleError(req, res, error);
    }
};

const findCustomerSchedules = async (req, res) => {
    try {
        const params = {
            filter: {
                customer_id: req.customer.id,
                date: req.query.date,
			},
			meta: {
				status: req.query.status,
			},
        };

        handleResponse(res, 200, await ScheduleService.findCustomerSchedules(params));
    } catch (error) {
        handleError(req, res, error);
    }
};

const updateStatus = async (req, res) => {
	const transaction = await sequelize.transaction();

    try {
        const params = {
            filter: {
                id: req.params.id,
                account_id: req.user.account_id,
			},
			meta: {
				status: req.body.status
			},
			transaction
		};

		const response = await ScheduleService.updateStatus(params);
		await transaction.commit();

        handleResponse(res, 200, response);
    } catch (error) {
		await transaction.rollback();
        handleError(req, res, error);
    }
};

const updateStatusFromCostumer = async (req, res) => {
	const transaction = await sequelize.transaction();

    try {
        const params = {
            filter: {
                id: req.params.id,
                customer_id: req.customer.id,
			},
			meta: {
				status: req.body.status
			},
			transaction
		};

		const response = await ScheduleService.updateStatus(params);
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
    findCustomerSchedules,
	updateStatus,
	updateStatusFromCostumer,
};
