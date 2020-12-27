const UserDao = require('../dao/user');
const CustomerDao = require('../dao/customer');
const AccountDao = require('../dao/account');
const RecoverPasswordDao = require('../dao/recover-passord');
const bcrypt = require('bcrypt');
const { handleException, getSignedToken, generateUUID } = require('../utils');
const Mailgun = require('mailgun-js');

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

	const recoverResult = await RecoverPasswordDao.create(recoverData, { transaction });

	const mailgun = new Mailgun({
		apiKey: process.env.MAILGUN_API_KEY,
		domain: process.env.MAILGUN_DOMAIN,
	});

	const emailData = {
		from: 'Equipe sked <suporte@skedapp.com>',
		to: filter.email,
		subject: 'Recuperar senha | Sked App',
		html: `
			<div>
				<strong>Caro(a) ${((user && user.name) || (customer && customer.name) )}</strong>
			</div>
			<p>Você solicitou a recuperação de senha de acesso ao Sked App.</p>
			<p>Clique no link abaixo para cadastrar a nova senha.</p>
			<a href="${process.env.CLIENT_URL}/reset-password/${recoverResult.token}" target="_blank">
				Recuperar minha senha.
			</a>
		`,
	};

	await mailgun.messages().send(emailData);

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
