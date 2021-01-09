const jwt = require('jsonwebtoken');
const UserDao = require('../dao/user');
const { api } = require('../../config');
const { handleException } = require('../utils');
const { handleError } = require('../services/handle-response');

const auth = async (req, res, next) => {
    try {
        const headerAuth = req.header('Authorization') || '';
        const token = headerAuth.replace('Bearer ', '');

        if (!token) {
            throw handleException('NOT_AUTHORIZED', 401);
		}

        const data = jwt.verify(token, api.secret_key);
        const user = await UserDao.find({
            id: data.id,
        }, {
			attributes: ['id', 'account_id']
		});

        if (!user) {
            throw handleException('NOT_AUTHORIZED', 401);
        }

        req.user = user;

        return next();
    } catch (error) {
		if (error.message && error.message.includes('jwt expired')) {
			error.skip_log = true;
		}

        handleError(req, res, error);
    }
};

module.exports = {
    auth,
};
