const CustomerController = require('../controllers/customer');

module.exports = (router) => {
    router.post('/customer/sign/in', (req, res) => CustomerController.signIn(req, res));
    router.post('/customer/sign/up', (req, res) => CustomerController.signUp(req, res));

    return router;
};
