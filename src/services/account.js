const AccountDao = require('../dao/account');

const find = async ({ filter }) => {
    const account = await AccountDao.find(filter, {
		attributes: ['id', 'name'],
	});

    return { account };
};

module.exports = {
    find: find,
};
