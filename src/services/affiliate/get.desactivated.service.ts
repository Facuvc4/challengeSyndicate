import PaymentsStatus from '../../models/payment.status.model';
import errorHelper from '../../helpers/error.helper';
import { getDesactivatedAffiliates } from '../../helpers/affiliate/get.desactivated.helper';

export async function getDesactivatedAffiliatesPaymentStatus() {
  try {
    const affiliates = [];
    const desactivatedAffiliates = await getDesactivatedAffiliates();
    for (const [id, name] of desactivatedAffiliates.entries()) {
      const statusPayment = await PaymentsStatus.findOne(
        {
          affiliate_id: parseInt(id),
        },
        'month year status -_id'
      );
      const affiliateData = {
        name: name,
        id: id,
        statusPayment: statusPayment,
      };

      affiliates.push(affiliateData);
    }
    return affiliates;
  } catch {
    errorHelper.notFoundError('No hay afiliados dados de baja');
  }
}
