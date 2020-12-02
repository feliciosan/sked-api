const jwt = require('jsonwebtoken');
const UserDao = require('../dao/user');
const AccountDao = require('../dao/account');
const { api } = require('../../config');
const { handleError, handleException } = require('../utils');

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
			attributes: ['id']
		});

        if (!user) {
            throw handleException('NOT_AUTHORIZED', 401);
        }

        const account = await AccountDao.find({
            user_id: user.id,
        });

        req.user = {
            id: user.id,
            account_id: account.id,
        };

        return next();
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    auth,
};
