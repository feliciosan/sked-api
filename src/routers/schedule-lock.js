const ScheduleLockController = require('../controllers/schedule-lock');

module.exports = (router, auth) => {
    router.get('/schedule-locks', auth, (req, res) => ScheduleLockController.findAll(req, res));
    router.post('/schedule-locks', auth, (req, res) => ScheduleLockController.create(req, res));
    router.put('/schedule-locks/:id', auth, (req, res) => ScheduleLockController.update(req, res));
    router.delete('/schedule-locks/:id', auth, (req, res) => ScheduleLockController.remove(req, res));

    return router;
};
