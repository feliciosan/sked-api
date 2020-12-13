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

const updateProfile = async (req, res) => {
    try {
        const params = {
            filter: {
				user_id: req.user.id,
				account_id: req.user.account_id,
			},
			changes: {
				user: req.body.user,
				account: req.body.account,
			}
        };

        handleResponse(res, 200, await UserService.updateProfile(params));
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
	profile,
	updateProfile,
};
