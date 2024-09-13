import PaymentsStatus from '../../models/payment.status.model';
import errorHelper from '../../helpers/error.helper';
import Affiliate from '../../models/affiliate.model';

export async function getPaymentStatusAffiliate(id: number) {
  try {
    const affiliate = await Affiliate.findById(id);
    const paymentStatus = await PaymentsStatus.find(
      {
        affiliate_id: id,
      },
      'month year status -_id'
    );
    const data = {
      afiliate: affiliate,
      paymentStatus: paymentStatus,
    };
    return data;
  } catch (error) {
    errorHelper.badRequestError('No se encontro al afiliado');
  }
}
