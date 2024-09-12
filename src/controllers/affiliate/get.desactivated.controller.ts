import { Request, Response, NextFunction } from 'express';
import { getDesactivatedAffiliatesPaymentStatus } from '../../services/affiliate/get.desactivated.service';

const main = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const affiliatesDesactivated =
      await getDesactivatedAffiliatesPaymentStatus();
    res.status(200).json(affiliatesDesactivated);
  } catch (error) {
    next(error);
  }
};

export default main;
