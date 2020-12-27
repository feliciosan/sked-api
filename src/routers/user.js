const UserController = require('../controllers/user');

module.exports = (router, userAuth) => {
    router.get('/users/profile', userAuth, (req, res) => UserController.profile(req, res));
    router.put('/users/profile', userAuth, (req, res) => UserController.updateProfile(req, res));
    router.get('/users', (req, res) => UserController.findAllByAccountId(req, res));

    return router;
};
