const UserService = require('../services/user');
const { handleResponse, handleError } = require('../utils');

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

module.exports = {
    profile,
};
