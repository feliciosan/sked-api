const AccountController = require('../controllers/account');

module.exports = (router) => {
    router.get('/accounts', (req, res) => AccountController.find(req, res));

    return router;
};
