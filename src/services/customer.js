const customerDao = require('../dao/customer');
const bcrypt = require('bcrypt');
const { handleException, getSignedToken } = require('../utils');

const signIn = async ({ filter, meta }) => {
    const customer = await customerDao.find(filter, {
		attributes: ['id', 'password'],
	});

    if (!customer) {
        throw handleException('INVALID_CREDENTIALS');
    }

    const match = await bcrypt.compare(meta.password, customer.password);

    if (!match) {
        throw handleException('INVALID_CREDENTIALS');
    }

    const token = getSignedToken(customer.id);

    return { token };
};

const signUp = async ({ data, transaction }) => {
    const customerExists = await customerDao.count({ email: data.email });

    if (customerExists) {
        throw handleException('EMAIL_ALREADY_IN_USE');
    }

    data.password = await bcrypt.hash(data.password, 10);

    const customer = await customerDao.create(data, { transaction });
    const token = getSignedToken(customer.id);

    return { token };
};

module.exports = {
    signIn,
    signUp,
};
