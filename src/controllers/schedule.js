const moment = require('moment');
const ScheduleService = require('../services/schedule');
const { handleResponse, handleError } = require('../utils');

const create = async (req, res) => {
    try {
        const params = {
            data: {
                date: moment(req.body.date).format(),
                start: req.body.start,
                end: req.body.end,
                account_id: req.body.account_id,
                service_id: req.body.service_id,
                customer_id: req.customer.id,
			},
		};

        handleResponse(res, 200, await ScheduleService.create(params));
    } catch (error) {
        handleError(res, error);
    }
};

const findAll = async (req, res) => {
    try {
        const params = {
            filter: {
                account_id: req.user.account_id,
				date: req.query.date,
			},
			meta: {
				status: req.query.status,
			},
        };

        handleResponse(res, 200, await ScheduleService.findAll(params));
    } catch (error) {
        handleError(res, error);
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
        handleError(res, error);
    }
};

const updateStatus = async (req, res) => {
    try {
        const params = {
            filter: {
                id: req.params.id,
                account_id: req.user.account_id,
			},
			meta: {
				status: req.body.status
			},
		};

        handleResponse(res, 200, await ScheduleService.updateStatus(params));
    } catch (error) {
        handleError(res, error);
    }
};

const updateStatusFromCostumer = async (req, res) => {
    try {
        const params = {
            filter: {
                id: req.params.id,
                customer_id: req.customer.id,
			},
			meta: {
				status: req.body.status
			},
		};

        handleResponse(res, 200, await ScheduleService.updateStatus(params));
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    create,
    findAll,
    findCustomerSchedules,
	updateStatus,
	updateStatusFromCostumer,
};
