const sequelize = require('../db');
const AccountDao = require('../dao/account');
const UserDao = require('../dao/user');
const User = sequelize.model('user');

const profile = async ({ filter }) => {
    const account = await AccountDao.find({
		user_id: filter.id
	}, {
		include: [{
			model: User,
			attributes: ['id', 'telephone', 'cpf_cnpj', 'email', 'name'],
		}],
		attributes: ['id', 'name', 'address'],
		nest: true,
	});

    return { account };
};


const updateProfile = async ({ filter, changes }) => {
	const updateAccount = AccountDao.update({
		id: filter.account_id,
	}, {
		address: changes.account.address,
	});

	const updateUser = UserDao.update({
		id: filter.user_id,
	}, {
		name: changes.user.name,
		cpf_cnpj: changes.user.cpf_cnpj,
		telephone: changes.user.telephone,
	});

	await Promise.all([updateAccount, updateUser]);

    return true;
};


module.exports = {
	profile,
	updateProfile,
};
