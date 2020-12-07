const sequelize = require('../db');
const AccountDao = require('../dao/account');
const User = sequelize.model('user');

const profile = async ({ filter }) => {
    const account = await AccountDao.find({
		user_id: filter.id
	}, {
		include: [{
			model: User,
			attributes: ['id', 'telephone', 'cpf_cnpj', 'email', 'name'],
		}],
		attributes: ['id', 'name'],
		nest: true,
	});

    return { account };
};

module.exports = {
    profile,
};
