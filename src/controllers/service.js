const ServiceService = require('../services/service');
const { handleResponse, handleError } = require('../utils')();
const sequelize = require('../db');

const create = async (req, res) => {
	const transaction = await sequelize.transaction();

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
			transaction
		};

		const response = await ServiceService.create(params);
		await transaction.commit();

        handleResponse(res, 201, response);
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

		const response = await ServiceService.remove(params);
		await transaction.commit();

        handleResponse(res, 200, response);
    } catch (error) {
		await transaction.rollback();
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
				name: req.body.name,
                duration: req.body.duration,
                show_price: req.body.show_price || false,
                price: req.body.price || 0,
			},
			transaction
		};

		const response = await ServiceService.update(params);
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
                account_id: req.user.account_id,
                user_id: req.user.id,
            },
        };

        handleResponse(res, 200, await ServiceService.findAll(params));
    } catch (error) {
        handleError(req, res, error);
    }
};

const findAllByAccountId = async (req, res) => {
    try {
        const params = {
            filter: {
                account_id: req.query.account_id,
                user_id: req.query.user_id,
            },
        };

        handleResponse(res, 200, await ServiceService.findAllByAccountId(params));
    } catch (error) {
        handleError(req, res, error);
    }
};

module.exports = {
    create,
	remove,
	update,
    findAll,
    findAllByAccountId,
};
