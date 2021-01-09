
const Mailgun = require('mailgun-js');
const { getFormattedDatePreview, getFormattedHourPreview } = require('../utils');
const mailgun = new Mailgun({
	apiKey: process.env.MAILGUN_API_KEY,
	domain: process.env.MAILGUN_DOMAIN,
});

const sendEmailAsync = ({
		from,
		to,
		subject,
		html
	}) => {

	const emailData = {
		from,
		to,
		subject,
		html,
	};

	return mailgun.messages().send(emailData);
};

const sendLogEmail = ({
		error,
		req,
	}) => {

	return sendEmailAsync({
		from: `Equipe Sked App <${process.env.SKED_EMAIL}>`,
		to: process.env.SKED_EMAIL,
		subject: 'Server Crash | Sked App',
		html: `
			<div>
				<strong>SERVER ERROR - status (${error.status || 500})</strong>
			</div>
			<p>ERROR: ${error}</p>
			<p>ROUTE: ${req.url}</p>
			<p>METHOD: ${req.method}</p>
			<p>BODY: ${JSON.stringify(req.body)}</p>
			<p>PARAMS: ${JSON.stringify(req.params)}</p>
			<p>QUERY: ${JSON.stringify(req.query)}</p>
		`,
	});
};

const sendRecoverPassordEmail = ({
		email,
		customer,
		user,
		token
	}) => {

	return sendEmailAsync({
		from: `Equipe Sked App <${process.env.SKED_EMAIL}>`,
		to: email,
		subject: 'Recuperar senha | Sked App',
		html: `
			<div>
				<strong>Caro(a) ${((user && user.name) || (customer && customer.name) )}</strong>
			</div>
			<p>Você solicitou a recuperação de senha de acesso ao Sked App.</p>
			<p>Clique no link abaixo para cadastrar a nova senha.</p>
			<a href="${process.env.CLIENT_URL}/reset-password/${token}" target="_blank">
				Recuperar minha senha.
			</a>
		`,
	});
};

const sendCreateScheduleEmail = ({
		schedule,
	}) => {

	return sendEmailAsync({
		from: `Equipe Sked App <${process.env.SKED_EMAIL}>`,
		to: schedule.user.email,
		subject: `(${schedule.account.name}) Agendamento | Sked App`,
		html: `
			<div>
				<p>Olá, um novo agendamento foi marcado para você! </p>
				<span>
					<strong>${schedule.customer.name}</strong> realizou um agendamento do serviço (${schedule.service.name})
					para o profissional (${schedule.user.name}).
				</span>
			</div>
			<div>
				<strong>Horário: </strong>
				<span>
					${getFormattedHourPreview({
						start: schedule.start,
						end: schedule.end,
					})}
				</span>
			</div>
			<div>
				<strong>Data: </strong>
				<span>
					${getFormattedDatePreview(schedule.date)}
				</span>
			</div>
		`,
	});
};

module.exports = {
	sendRecoverPassordEmail,
	sendCreateScheduleEmail,
	sendLogEmail,
};
