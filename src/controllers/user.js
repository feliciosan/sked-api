const UserService = require('../services/user');
const { handleResponse, handleError } = require('../utils');
const sequelize = require('../db');

const profile = async (req, res) => {
    try {
        const params = {
            filter: {
                id: req.user.id,
            }
        };

        handleResponse(res, 200, await UserService.profile(params));
    } catch (error) {
        handleError(res, error);
    }
};

const updateProfile = async (req, res) => {
	const transaction = await sequelize.transaction();

    try {
		const user = req.body.user;
		const account = req.body.account;
        const params = {
            filter: {
				user_id: req.user.id,
				account_id: req.user.account_id,
			},
			changes: {
				user: {
					name: user.name,
					cpf: user.cpf,
				},
				account: {
					name: account.name,
					cpf_cnpj: account.cpf_cnpj,
					telephone: account.telephone,
					address: account.address,
				},
			},
			transaction
		};

		const response = await UserService.updateProfile(params);
		await transaction.commit();

        handleResponse(res, 200, response);
    } catch (error) {
		await transaction.rollback();
        handleError(res, error);
    }
};

const findAllByAccountId = async (req, res) => {
    try {
        const params = {
            filter: {
				account_id: req.query.account_id,
				pending: false,
            },
        };

        handleResponse(res, 200, await UserService.findAllByAccountId(params));
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
	profile,
	updateProfile,
	findAllByAccountId,
};
