const ServiceService = require('../services/service');
const { handleResponse, handleError } = require('../utils');

const create = async (req, res) => {
    try {
        const params = {
            data: {
                name: req.body.name,
                duration: req.body.duration,
                user_id: req.user.id,
				account_id: req.user.account_id,
				show_price: req.body.show_price || false,
                price: req.body.price || 0,
            },
        };

        handleResponse(res, 201, await ServiceService.create(params));
    } catch (error) {
        handleError(res, error);
    }
};

const remove = async (req, res) => {
    try {
        const params = {
            filter: {
                id: req.params.id,
                user_id: req.user.id,
                account_id: req.user.account_id,
            },
        };

        handleResponse(res, 200, await ServiceService.remove(params));
    } catch (error) {
        handleError(res, error);
    }
};

const update = async (req, res) => {
    try {
        const params = {
            filter: {
                id: req.params.id,
                user_id: req.user.id,
                account_id: req.user.account_id,
			},
			changes: {
				name: req.body.name,
                duration: req.body.duration,
                show_price: req.body.show_price || false,
                price: req.body.price || 0,
			}
        };

        handleResponse(res, 200, await ServiceService.update(params));
    } catch (error) {
        handleError(res, error);
    }
};

const findAll = async (req, res) => {
    try {
        const params = {
            filter: {
                account_id: req.user.account_id,
            },
        };

        handleResponse(res, 200, await ServiceService.findAll(params));
    } catch (error) {
        handleError(res, error);
    }
};

const findAllById = async (req, res) => {
    try {
        const params = {
            filter: {
                account_id: req.query.account_id,
            },
        };

        handleResponse(res, 200, await ServiceService.findAllById(params));
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    create,
	remove,
	update,
    findAll,
    findAllById,
};
