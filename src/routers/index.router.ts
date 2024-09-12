import fileRouter from './file.router';
import express from 'express';
import affiliateRouter from './affiliate.router';

const router = express.Router();

router.use('/files', fileRouter);
router.use('/affiliate', affiliateRouter);

export default router;
