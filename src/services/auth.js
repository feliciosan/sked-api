const UserDao = require('../dao/user');
const AccountDao = require('../dao/account');
const bcrypt = require('bcrypt');
const { handleException, getSignedToken } = require('../utils');

const signIn = async ({ filter, meta }) => {
    const user = await UserDao.find(filter, {
		attributes: ['id', 'password', 'pending']
	});

    if (!user) {
        throw handleException('INVALID_CREDENTIALS', 400);
	}

	if (user.pending) {
        throw handleException('PENDING_CREDENTIALS', 400);
    }

    const match = await bcrypt.compare(meta.password, user.password);

    if (!match) {
        throw handleException('INVALID_CREDENTIALS', 400);
    }

    const token = getSignedToken(user.id);
    const account = await AccountDao.find({ user_id: user.id });

    return { token, account };
};

const signUp = async ({ meta, data }) => {
    const userExists = await UserDao.count({ email: data.email });

    if (userExists) {
        throw handleException('EMAIL_ALREADY_IN_USE', 409);
    }

    const accountExists = await AccountDao.count({
        name: meta.account,
    });

    if (accountExists) {
        throw handleException('ACCOUNT_ALREADY_IN_USE', 409);
    }

    data.password = await bcrypt.hash(data.password, 10);

    const user = await UserDao.create(data);

    await AccountDao.create({
        name: meta.account,
        user_id: user.id,
    });

    return true;
};

module.exports = {
    signIn: signIn,
    signUp: signUp,
};
