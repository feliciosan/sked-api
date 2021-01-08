module.exports = () => {
	const EmailService = require('../services/email');
	const jwt = require('jsonwebtoken');
	const moment = require('moment');
	const { api } = require('../../config');

	const handleResponse = (res, code, data) => {
		res.status(code || 200).send(data || {});
	};

	const handleError = (req, res, error) => {
		const message = exceptionMessages(error.code);

		if (!error.skip_log) {
			EmailService.sendLogEmail({ error, req });
		}

		res.status(error.status || 500).send(error.message || message);
	};

	const handleException = (code, status) => {
		return {
			status,
			code,
			skip_log: true,
		};
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

	const generateUUID = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);

			return v.toString(16);
		});
	};

	const getFormattedDatePreview = (date) => {
		return moment(date).format('DD/MM/YYYY');
	};

	const getFormattedHourPreview = ({ start, end }) => {
		return `${start.slice(0, 5)} às ${end.slice(0, 5)}`;
	};


	return {
		handleError,
		handleResponse,
		handleException,
		getTimegridStructure,
		getSignedToken,
		generateUUID,
		getFormattedDatePreview,
		getFormattedHourPreview,
	};
};
