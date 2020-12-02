const AccountDao = require('../dao/account');

const find = async ({ filter }) => {
    const account = await AccountDao.find(filter);

    return { account };
};

module.exports = {
    find: find,
};
