import { Router } from 'express';
import { getDesativatedAffiliatesController } from '../controllers/index.controller';
import upload from '../helpers/file/create.helper';

export const affiliateRouter = Router();

affiliateRouter.get('/desactivateds', getDesativatedAffiliatesController);

export default affiliateRouter;
