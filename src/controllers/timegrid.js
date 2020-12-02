const TimegridService = require('../services/timegrid');
const { handleResponse, handleError } = require('../utils');

const set = async (req, res) => {
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
        };

        handleResponse(res, 201, await TimegridService.set(params));
    } catch (error) {
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
