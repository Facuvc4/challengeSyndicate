import PaymentsStatus from '../../models/payment.status.model';
import { getMonths } from '../get.months.helper';
import { getAffiliates } from './get.helper';

const desactivatedAffiliates = new Map();

export async function getDesactivatedAffiliates(
  yearRequest: number = 0,
  months: any = 0,
  affiliates: any = 0
) {
  if (yearRequest === 0) yearRequest = new Date().getFullYear();
  if (months === 0) months = await getMonths(yearRequest);
  if (affiliates === 0) affiliates = await getAffiliates();

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
        const nextMonth1 = (month % 12) + 1;
        const nextMonth2 = (nextMonth1 % 12) + 1;
        const nextYear = yearRequest + 1;
        const result2 = await PaymentsStatus.findOne({
          affiliate_id: affiliate._id,
          month: nextMonth1,
          year: nextMonth1 === 1 ? nextYear : yearRequest,
          status: 'unpaid',
        });
        const result3 = await PaymentsStatus.findOne({
          affiliate_id: affiliate._id,
          month: nextMonth2,
          year: nextMonth2 === 1 || nextMonth2 === 2 ? nextYear : yearRequest,
          status: 'unpaid',
        });

        if (!result && result2 && result3)
          desactivatedAffiliates.set(affiliate._id, affiliate.name);
      }
    }
  }

  return desactivatedAffiliates;
}
