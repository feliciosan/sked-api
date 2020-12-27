const sequelize = require('../db');
const RecoverPassword = sequelize.model('recover_password');

const create = (data, options = {}) => {
    return RecoverPassword.create(data, options);
};

const remove = (filter, options = {}) => {
	const query = {
        where: filter,
		raw: true,
        ...options,
	};

    return RecoverPassword.destroy(query);
};

const find = (filter, options = {}) => {
	const query = {
        where: filter,
		raw: true,
        ...options,
    };

    return RecoverPassword.findOne(query);
};

module.exports = {
	create,
    remove,
	find,
};
