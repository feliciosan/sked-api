const sequelize = require('../db');
const AccountDao = require('../dao/account');
const UserDao = require('../dao/user');
const Account = sequelize.model('account');

const profile = async ({ filter }) => {
    const user = await UserDao.find({
		id: filter.id
	}, {
		include: [{
			model: Account,
			attributes: ['name', 'url', 'cpf_cnpj', 'telephone', 'address'],
		}],
		attributes: ['id', 'name', 'email', 'account_id', 'is_root', 'cpf'],
		nest: true,
	});

    return { user };
};


const updateProfile = async ({ filter, changes, transaction }) => {
	const updateAccount = AccountDao.update({
		id: filter.account_id,
	}, changes.account, { transaction });

	const updateUser = UserDao.update({
		id: filter.user_id,
	}, changes.user, { transaction });

	await Promise.all([updateAccount, updateUser]);

    return true;
};

const findAllByAccountId = async ({ filter }) => {
	const usersData = await UserDao.findAllByAccountId(filter);
	const users = {};

    usersData.forEach((user) => {
        users[user.id] = user;
    });

    return { users };
};


module.exports = {
	profile,
	updateProfile,
	findAllByAccountId,
};
