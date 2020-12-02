const ServiceController = require('../controllers/service');

module.exports = (router, auth) => {
    router.get('/services', auth, (req, res) => ServiceController.findAll(req, res));
    router.get('/services/by-id', (req, res) => ServiceController.findAllById(req, res));
    router.post('/services', auth, (req, res) => ServiceController.create(req, res));
    router.put('/services/:id', auth, (req, res) => ServiceController.update(req, res));
    router.delete('/services/:id', auth, (req, res) => ServiceController.remove(req, res));

    return router;
};
