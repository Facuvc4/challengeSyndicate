import Affiliate from '../models/affiliate.model';
import Payments from '../models/payment.model';
import PaymentsStatus from '../models/payment.status.model';
import errorHelper from '../helpers/error.helper';

export async function uploadFile(
  data: any,
  monthRequest: number,
  yearRequest: number
) {
  try {
    for (const affiliate of data) {
      const existingPaid = await PaymentsStatus.findOne({
        affiliate_id: affiliate.affiliate_id,
        month: monthRequest,
        year: yearRequest,
        status: 'paid',
      });
      if (existingPaid) {
        console.log(
          `El afiliado ${affiliate.name} ya pago el mes ${monthRequest} del año ${yearRequest}`
        );
      } else {
        await Affiliate.updateOne(
          { _id: affiliate.affiliate_id },
          {
            $setOnInsert: {
              dni: affiliate.dni,
              _id: affiliate.affiliate_id,
              name: affiliate.name,
              affiliation_description: affiliate.affiliation_description,
            },
          },
          {
            upsert: true,
          }
        );
        await Payments.updateOne(
          {
            affiliate_id: affiliate.affiliate_id,
            payment_date: affiliate.payment_date,
          },
          {
            $setOnInsert: {
              affiliate_id: affiliate.affiliate_id,
              payment_date: affiliate.payment_date,
              payment_type_code: affiliate.payment_type_code,
              payment_type: affiliate.payment_type,
              service_code: affiliate.service_code,
              service_description: affiliate.service_description,
              amount: affiliate.amount,
              installments_number: affiliate.installments_number,
              percentage: affiliate.percentage,
              union_code: affiliate.union_code,
              sub_total: affiliate.sub_total,
              total: affiliate.total,
              payment_reference: affiliate.payment_reference,
              identification_code: affiliate.identification_code,
              pays: affiliate.pays,
            },
          },
          {
            upsert: true,
          }
        );
        await PaymentsStatus.updateOne(
          {
            affiliate_id: affiliate.affiliate_id,
            month: monthRequest,
            year: yearRequest,
          },
          {
            $set: {
              affiliate_id: affiliate.affiliate_id,
              month: monthRequest,
              year: yearRequest,
              status: 'paid',
            },
          },
          {
            upsert: true,
          }
        );
      }
    }
  } catch (error) {
    errorHelper.badRequestError('Error al subir datos a la BD ' + error);
  }
}
