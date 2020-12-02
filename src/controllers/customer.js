const CustomerService = require('../services/customer');
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

        handleResponse(res, 200, await CustomerService.signIn(params));
    } catch (error) {
        console.log(error);
        handleError(res, error);
    }
};

const signUp = async (req, res) => {
    try {
        const params = {
            data: {
                email: req.body.email,
                name: req.body.name,
                telephone: req.body.telephone,
                password: req.body.password,
            },
        };

        handleResponse(res, 201, await CustomerService.signUp(params));
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    signIn,
    signUp,
};
