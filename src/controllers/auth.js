const AuthService = require('../services/auth');
const { handleResponse, handleError } = require('../utils');

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

        handleResponse(res, 200, await AuthService.signIn(params));
    } catch (error) {
        handleError(res, error);
    }
};

const signUp = async (req, res) => {
    try {
        const params = {
            meta: {
                account: req.body.account,
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                telephone: req.body.telephone,
                cpf_cnpj: req.body.cpf_cnpj,
                password: req.body.password,
                pending: true,
            },
        };

        handleResponse(res, 201, await AuthService.signUp(params));
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    signIn,
    signUp,
};
