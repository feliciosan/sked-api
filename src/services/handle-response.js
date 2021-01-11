const EmailService = require('../services/email');

const handleResponse = (res, code, data) => {
	return res.status(code || 200).send(data || {});
};

const handleError = (req, res, error) => {
	const message = exceptionMessages(error.code);

	if (!error.skip_log) {
		EmailService.sendLogEmail({ error, req });
	}

	if (process.env.NODE_ENV === 'development') {
		console.log(error);
	}

	return res.status(error.status || 500).send(error.message || message);
};

const exceptionMessages = (code) => {
	const messages = {
		EMAIL_ALREADY_IN_USE: 'Este email já está em uso.',
		ACCOUNT_ALREADY_IN_USE: 'Esta conta já está em uso.',
		NOT_AUTHORIZED: 'Ação não autorizada.',
		INVALID_CREDENTIALS: 'Credenciais inválidas.',
		SLOT_UNAVAILABLE: 'Este horário não está mais disponível.',
		PENDING_CREDENTIALS: 'Suas credenciais ainda estão pendentes.',
		STATUS_NOT_FOUND: 'Status não encontrado.',
		SCHEDULE_FINISHED: 'Este agendamento já foi finalizado.',
		SCHEDULE_CANCELED: 'Este agendamento já foi cancelado.',
		RECOVER_UNAVAILABLE: 'Não é mais possível resetar sua senha através deste link.',
		SCHEDULE_CANCELED_OR_FINISHED: 'Este agendamento já foi cancelado ou finalizado.',
		LOCK_UNAVAILABLE: 'Não foi possível realizar o cadastro. Já existem bloqueios configurados para esta data e hora.'
	};

	return messages[code] || 'Algum erro aconteceu, tente mais tarde.';
};

module.exports = {
	handleResponse,
	handleError,
};
