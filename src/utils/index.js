const jwt = require('jsonwebtoken');
const moment = require('moment');
const { api } = require('../../config');

const handleException = (code, status) => {
	return {
		status,
		code,
		skip_log: true,
	};
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

module.exports = {
	handleException,
	getTimegridStructure,
	getSignedToken,
	generateUUID,
	getFormattedDatePreview,
	getFormattedHourPreview,
};
