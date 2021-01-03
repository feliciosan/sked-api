require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { api } = require('./config');

const db = require('./src/db');
const setRouters = require('./src/routers');

const initDatabase = async () => {
    try {
        await db.authenticate();

        // db.sync();
        // db.sync({ alter: true });
        // db.sync({ force: true });

        console.log('Database connected.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

const initServer = () => {
	try {
		const app = express();

		app.use(helmet());
		app.use(cors());
		app.use(express.json());

		setRouters(app);

		app.listen(api.port, () => {
			console.log(`Server running on port ${api.port}`);
		});
	} catch (error) {
		console.error('Unable to connect to the server:', error);
	}
};

const initApp = async () => {
    await initDatabase();

    initServer();
};

initApp();
