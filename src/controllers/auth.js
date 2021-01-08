const AuthService = require('../services/auth');
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
			}
        };

        handleResponse(res, 200, await AuthService.signIn(params));
    } catch (error) {
        handleError(req, res, error);
    }
};

const signUp = async (req, res) => {
	const transaction = await sequelize.transaction();

    try {
		const user = req.body.user;
		const account = req.body.account;
        const params = {
			account: {
				name: account.name,
				url: account.url,
				cpf_cnpj: account.cpf_cnpj,
				telephone: account.telephone,
			},
			user: {
				name: user.name,
				email: user.email,
				password: user.password,
				pending: true,
				is_root: true,
			},
			transaction
		};

		const response = await AuthService.signUp(params);
		await transaction.commit();

        handleResponse(res, 201, response);
    } catch (error) {
		await transaction.rollback();
        handleError(req, res, error);
    }
};

const recoverPassword = async (req, res) => {
	const transaction = await sequelize.transaction();

    try {
        const params = {
            filter: {
				email: req.body.email,
			},
			meta: {
				is_customer: req.body.is_customer,
			},
			transaction
		};

		const response = await AuthService.recoverPassword(params);
		await transaction.commit();

        handleResponse(res, 200, response);
    } catch (error) {
		await transaction.rollback();
        handleError(req, res, error);
    }
};

const resetPassword = async (req, res) => {
	const transaction = await sequelize.transaction();

    try {
        const params = {
			filter: {
				token: req.body.token,
			},
			changes: {
				password: req.body.password,
			},
			transaction
		};

		const response = await AuthService.resetPassword(params);
		await transaction.commit();

        handleResponse(res, 200, response);
    } catch (error) {
		await transaction.rollback();
        handleError(req, res, error);
    }
};

module.exports = {
    signIn,
	signUp,
	recoverPassword,
	resetPassword,
};
