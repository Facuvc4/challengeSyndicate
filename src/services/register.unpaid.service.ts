import { getAffiliates } from '../helpers/affiliate/get.helper';
import { getMonths } from '../helpers/get.months.helper';
import PaymentsStatus from '../models/payment.status.model';
import { getDesactivatedAffiliates } from '../helpers/affiliate/get.desactivated.helper';

export async function registerUnpaid(yearRequest: number) {
  try {
    const months = await getMonths(yearRequest);
    const affiliates = await getAffiliates();
    const desactivatedAffiliates = await getDesactivatedAffiliates(yearRequest);
    if (months && affiliates) {
      for (const affiliate of affiliates) {
        if (desactivatedAffiliates.has(affiliate._id)) continue;
        for (const month of months) {
          const result = await PaymentsStatus.findOne({
            affiliate_id: affiliate._id,
            month: month,
            year: yearRequest,
            status: 'paid',
          });
          if (!result) {
            await PaymentsStatus.updateOne(
              {
                affiliate_id: affiliate._id,
                month: month,
                year: yearRequest,
              },
              {
                $setOnInsert: {
                  status: 'unpaid',
                },
              }
            );
          }
        }
      }
    }
  } catch (error) {
    console.log('Error al cargar la baja de los afiliados' + error);
  }
}
