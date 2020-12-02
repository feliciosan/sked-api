const AuthController = require('../controllers/auth');

module.exports = (router) => {
    router.post('/sign/up', (req, res) => AuthController.signUp(req, res));
    router.post('/sign/in', (req, res) => AuthController.signIn(req, res));

    return router;
};
