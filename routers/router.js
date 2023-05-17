const Router = require('express');
const controller = require('../controllers/userController.js');

const router = new Router();

router.post('/sign', controller.sign);
router.post('/login', controller.login);
router.get('/users', controller.getAll);

module.exports = router;