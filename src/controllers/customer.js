const CustomerService = require('../services/customer');
const { handleResponse, handleError } = require('../utils')();
const sequelize = require('../db');

const signIn = async (req, res) => {
    try {
        const params = {
            filter: {
                email: req.body.email,
            },
            meta: {
                password: req.body.password,
            },
		};

		const response = await CustomerService.signIn(params);

        handleResponse(res, 200, response);
    } catch (error) {
        handleError(req, res, error);
    }
};

const signUp = async (req, res) => {
	const transaction = await sequelize.transaction();

    try {
        const params = {
            data: {
                email: req.body.email,
                name: req.body.name,
                telephone: req.body.telephone,
                password: req.body.password,
			},
			transaction
		};

		const response = await CustomerService.signUp(params);
		await transaction.commit();

        handleResponse(res, 201, response);
    } catch (error) {
		await transaction.rollback();
        handleError(req, res, error);
    }
};

module.exports = {
    signIn,
    signUp,
};
