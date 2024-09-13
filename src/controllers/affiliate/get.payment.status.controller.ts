import { Request, Response, NextFunction } from 'express';
import { getPaymentStatusAffiliate } from '../../services/affiliate/get.payment.status.service';

const main = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const paymentStatus = await getPaymentStatusAffiliate(
      parseInt(req.params.id)
    );
    res.status(200).json(paymentStatus);
  } catch (error) {
    next(error);
  }
};

export default main;
