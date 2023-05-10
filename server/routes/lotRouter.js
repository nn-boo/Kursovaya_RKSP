const Router = require('express');
const router = new Router();
const lotRouter = require('../controllers/lotController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/get', lotRouter.getAll);
router.post('/bet', authMiddleware, lotRouter.doBet);
router.post('/create', checkRole('ADMIN'), lotRouter.create);
router.post('/delete', checkRole('ADMIN'), lotRouter.delete);
router.post('/update', checkRole('ADMIN'), lotRouter.update);
router.post('/win', authMiddleware, lotRouter.getWinLots);

module.exports = router;