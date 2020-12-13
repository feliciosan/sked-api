const UserController = require('../controllers/user');

module.exports = (router, userAuth) => {
    router.get('/user/profile', userAuth, (req, res) => UserController.profile(req, res));
    router.put('/user/profile', userAuth, (req, res) => UserController.updateProfile(req, res));

    return router;
};
