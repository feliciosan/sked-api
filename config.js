module.exports = {
    api: {
        port: process.env.PORT || process.env.API_PORT,
        host: process.env.API_HOST,
        secret_key: process.env.API_SECRET_KEY,
    },
    db: {
		database_url: process.env.DATABASE_URL
	},
};
