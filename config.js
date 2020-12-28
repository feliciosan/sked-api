module.exports = {
    api: {
        port: process.env.API_PORT,
        host: process.env.API_HOST,
        secret_key: process.env.API_SECRET_KEY,
    },
    db: {
        name: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
        port: process.env.DATABASE_PORT,
    },
};
