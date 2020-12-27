const TimegridService = require('../services/timegrid');
const { handleResponse, handleError } = require('../utils');
const sequelize = require('../db');

const set = async (req, res) => {
	const transaction = await sequelize.transaction();

    try {
        const params = {
            filter: {
                user_id: req.user.id,
            },
            data: {
                timegrid: (req.body.timegrid || []).map((timegrid) => ({
                    ...timegrid,
                    user_id: req.user.id,
                    account_id: req.user.account_id,
                })),
			},
			transaction
		};

		const response = await TimegridService.set(params);
		await transaction.commit();

        handleResponse(res, 201, response);
    } catch (error) {
		await transaction.rollback();
        handleError(res, error);
    }
};

const findAll = async (req, res) => {
    try {
        const params = {
            filter: {
                user_id: req.user.id,
            },
        };

        handleResponse(res, 200, await TimegridService.findAll(params));
    } catch (error) {
        handleError(res, error);
    }
};

const findByDay = async (req, res) => {
    try {
        const params = {
            filter: {
                account_id: req.query.account_id,
                user_id: req.query.user_id,
				date: req.query.date,
            },
            meta: {
                service: {
                    id: req.query.service_id,
                    duration: req.query.service_duration,
                },
            },
		};

        handleResponse(res, 200, await TimegridService.findByDay(params));
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    set,
    findAll,
    findByDay,
};
