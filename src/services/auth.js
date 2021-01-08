const UserDao = require('../dao/user');
const CustomerDao = require('../dao/customer');
const AccountDao = require('../dao/account');
const RecoverPasswordDao = require('../dao/recover-passord');
// const EmailService = require('./email')();
const bcrypt = require('bcrypt');
const { handleException, getSignedToken, generateUUID } = require('../utils')();

const signIn = async ({ filter, meta }) => {
    const user = await UserDao.find(filter, {
		attributes: ['id', 'password', 'pending', 'account_id'],
	});

    if (!user) {
        throw handleException('INVALID_CREDENTIALS');
	}

	if (user.pending) {
        throw handleException('PENDING_CREDENTIALS');
    }

    const match = await bcrypt.compare(meta.password, user.password);

    if (!match) {
        throw handleException('INVALID_CREDENTIALS');
    }

    const token = getSignedToken(user.id);
    const account = await AccountDao.find({
		id: user.account_id,
	}, {
		attributes: ['url'],
	});

    return { token, account };
};

const signUp = async ({ account, user, transaction }) => {
	const accountExists = await AccountDao.count({
        url: account.url,
    });

    if (accountExists) {
        throw handleException('ACCOUNT_ALREADY_IN_USE');
	}

    const userExists = await UserDao.count({
		email: user.email
	});

    if (userExists) {
        throw handleException('EMAIL_ALREADY_IN_USE');
    }

	const createdAccount = await AccountDao.create(account, { transaction });

	user.password = await bcrypt.hash(user.password, 10);

    await UserDao.create({
		...user,
		account_id: createdAccount.id
	}, { transaction });

    return true;
};

const recoverPassword = async ({ filter, meta, transaction }) => {
	const recoverData = {
		token: generateUUID(),
	};
	let user;
	let customer;

	if (meta.is_customer) {
		customer = await CustomerDao.find(filter, {
			attributes: ['id', 'name', 'email'],
		});

		if (!customer) {
			throw handleException('INVALID_CREDENTIALS');
		}

		recoverData.customer_id = customer.id;
	} else {
		user = await UserDao.find(filter, {
			attributes: ['id', 'name', 'email'],
		});

		if (!user) {
			throw handleException('INVALID_CREDENTIALS');
		}

		recoverData.user_id = user.id;
	}

	await RecoverPasswordDao.create(recoverData, { transaction });

	// await EmailService.sendRecoverPassordEmail({
	// 	email: filter.email,
	// 	customer: customer,
	// 	user: user,
	// 	token: recoverResult.token,
	// });

	return true;
};

const resetPassword = async ({ filter, changes, transaction }) => {
	const recover = await RecoverPasswordDao.find(filter, {
		attributes: ['id', 'user_id', 'customer_id'],
	});

	if (!recover) {
		throw handleException('RECOVER_UNAVAILABLE');
	}

	changes.password = await bcrypt.hash(changes.password, 10);

	if (recover.user_id) {
		await UserDao.update({
			id: recover.user_id,
		}, changes, { transaction });
	} else {
		await CustomerDao.update({
			id: recover.customer_id,
		}, changes, { transaction });
	}

	await RecoverPasswordDao.remove({
		id: recover.id,
	}, { transaction });

	return {
		is_customer: !recover.user_id ? true : false,
	};
};

module.exports = {
    signIn,
	signUp,
	recoverPassword,
	resetPassword,
};
