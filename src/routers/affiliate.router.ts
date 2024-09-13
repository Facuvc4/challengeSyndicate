import { Router } from 'express';
import {
  getDesativatedAffiliatesController,
  getPaymentStatus,
} from '../controllers/index.controller';

export const affiliateRouter = Router();

affiliateRouter.get('/desactivateds', getDesativatedAffiliatesController);
affiliateRouter.get('/:id', getPaymentStatus);

export default affiliateRouter;
