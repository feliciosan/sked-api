const sequelize = require('../db');
const AccountDao = require('../dao/account');
const User = sequelize.model('user');

const find = async ({ filter }) => {
    const account = await AccountDao.find(filter, {
		include: [{
			model: User,
			attributes: ['name'],
		}],
		attributes: ['id', 'name'],
		nest: true,
	});

    return { account };
};

module.exports = {
    find: find,
};
