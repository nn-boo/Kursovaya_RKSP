const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/auth', authMiddleware, userController.check);
router.get('/getAll', checkRole('ADMIN'), userController.getAll);
router.patch('/patch', checkRole('ADMIN'), userController.patch);
router.post('/delete', checkRole('ADMIN'), userController.delete);

module.exports = router;