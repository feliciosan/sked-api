const ScheduleController = require('../controllers/schedule');

module.exports = (router, customerAuth, userAuth) => {
    router.post('/schedules', customerAuth, (req, res) => ScheduleController.create(req, res));
    router.get('/schedules', userAuth, (req, res) => ScheduleController.findAll(req, res));
    router.get('/customer-schedules', customerAuth, (req, res) => ScheduleController.findCustomerSchedules(req, res));
	router.put('/schedules/status/:id', userAuth, (req, res) => ScheduleController.updateStatus(req, res));
	router.put('/customer-schedules/status/:id', customerAuth, (req, res) => ScheduleController.updateStatusFromCostumer(req, res));

    return router;
};
