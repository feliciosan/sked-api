const express = require('express');
const router = express.Router();

const userMiddleware = require('../middlewares/user');
const customerMiddleware = require('../middlewares/customer');

const AuthRouter = require('./auth');
const AccountRouter = require('./account');
const TimegridRouter = require('./timegrid');
const ScheduleRouter = require('./schedule');
const CustomerRouter = require('./customer');
const ServiceRouter = require('./service');

const routes = (app) => {
    app.use(AuthRouter(router));
    app.use(CustomerRouter(router));
    app.use(AccountRouter(router));
    app.use(TimegridRouter(router, userMiddleware.auth));
    app.use(ScheduleRouter(router, customerMiddleware.auth, userMiddleware.auth));
    app.use(ServiceRouter(router, userMiddleware.auth));
};

module.exports = routes;
