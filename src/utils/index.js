const jwt = require('jsonwebtoken');
const { api } = require('../../config');

const handleResponse = (res, code, data) => {
    res.status(code || 200).send(data || {});
};

const handleError = (res, error) => {
	const message = exceptionMessages(error.code);

	res.status(error.status || 500).send(error.message || message);

	console.log(error);
};

const handleException = (code, status) => {
    return {
        status,
        code,
    };
};

const exceptionMessages = (code) => {
    const messages = {
        EMAIL_ALREADY_IN_USE: 'Este email já está em uso.',
        ACCOUNT_ALREADY_IN_USE: 'Esta conta já está em uso.',
        NOT_AUTHORIZED: 'Ação não autorizada',
        INVALID_CREDENTIALS: 'Credenciais inválidas',
        SLOT_UNAVAILABLE: 'Este horário não está mais disponível',
        PENDING_CREDENTIALS: 'Suas credenciais ainda estão pendentes',
    };

    return messages[code] || 'Algum erro aconteceu, tente mais tarde.';
};

const getTimegridStructure = () => {
    return {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
    };
};

const getSignedToken = (userId) => {
    return jwt.sign({ id: userId }, api.secret_key, { expiresIn: '24h' });
};

module.exports = {
    handleError,
    handleResponse,
    handleException,
    getTimegridStructure,
    getSignedToken,
};
