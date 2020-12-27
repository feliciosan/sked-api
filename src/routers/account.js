const AccountController = require('../controllers/account');

module.exports = (router) => {
    router.get('/accounts/:account', (req, res) => AccountController.find(req, res));

    return router;
};
