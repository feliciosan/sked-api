const AccountService = require('../services/account');
const { handleResponse, handleError } = require('../services/handle-response');

const find = async (req, res) => {
    try {
        const params = {
            filter: {
                url: req.params.account,
            },
        };

        handleResponse(res, 200, await AccountService.find(params));
    } catch (error) {
        handleError(req, res, error);
    }
};

module.exports = {
    find,
};
