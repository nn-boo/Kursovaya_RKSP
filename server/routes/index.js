const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const lotRouter = require('./lotRouter');

router.use('/user', userRouter);
router.use('/lot', lotRouter);

module.exports = router;