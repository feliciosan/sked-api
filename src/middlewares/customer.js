const jwt = require('jsonwebtoken');
const CustomerDao = require('../dao/customer');
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
        const customer = await CustomerDao.find({
            id: data.id,
        }, {
			attributes: ['id'],
		});

        if (!customer) {
            throw handleException('NOT_AUTHORIZED', 401);
        }

        req.customer = {
            id: customer.id,
        };

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
