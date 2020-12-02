const TimegridController = require('../controllers/timegrid');

module.exports = (router, userAuth) => {
    router.post('/timegrid', userAuth, (req, res) => TimegridController.set(req, res));
    router.get('/timegrid', userAuth, (req, res) => TimegridController.findAll(req, res));
    router.get('/timegrid/by-day', (req, res) => TimegridController.findByDay(req, res));

    return router;
};
