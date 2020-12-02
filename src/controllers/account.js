const AccountService = require('../services/account');
const { handleResponse, handleError } = require('../utils');

const find = async (req, res) => {
    try {
        const params = {
            filter: {
                name: req.query.account,
            },
        };

        handleResponse(res, 200, await AccountService.find(params));
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    find,
};
