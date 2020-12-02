module.exports = {
    api: {
        port: process.env.API_PORT,
        secret_key: process.env.API_SECRET_KEY,
    },
    db: {
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
    },
};
