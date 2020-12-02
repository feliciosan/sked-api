const customerDao = require('../dao/customer');
const bcrypt = require('bcrypt');
const { handleException, getSignedToken } = require('../utils');

const signIn = async ({ filter, meta }) => {
    const user = await customerDao.find(filter);

    if (!user) {
        throw handleException('INVALID_CREDENTIALS', 400);
    }

    const match = await bcrypt.compare(meta.password, user.password);

    if (!match) {
        throw handleException('INVALID_CREDENTIALS', 400);
    }

    const token = getSignedToken(user.id);

    return { token };
};

const signUp = async ({ data }) => {
    const userExists = await customerDao.count({ email: data.email });

    if (userExists) {
        throw handleException('EMAIL_ALREADY_IN_USE', 409);
    }

    data.password = await bcrypt.hash(data.password, 10);

    const user = await customerDao.create(data);
    const token = getSignedToken(user.id);

    return { token };
};

module.exports = {
    signIn: signIn,
    signUp: signUp,
};
