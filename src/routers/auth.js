const AuthController = require('../controllers/auth');

module.exports = (router) => {
    router.post('/sign/up', (req, res) => AuthController.signUp(req, res));
    router.post('/sign/in', (req, res) => AuthController.signIn(req, res));
    router.post('/sign/recover', (req, res) => AuthController.recoverPassword(req, res));
    router.post('/sign/reset', (req, res) => AuthController.resetPassword(req, res));

    return router;
};
