import PaymentsStatus from '../models/payment.status.model';
import errorHelper from './error.helper';

export async function getMonths(yearRequest: number) {
  try {
    let results: number[] = [];
    for (let i = 1; i < 13; i++) {
      const result = await PaymentsStatus.findOne(
        { month: i, year: yearRequest },
        'month -_id'
      ).exec();
      result && results.push(result.month);
    }
    return results;
  } catch (error) {
    errorHelper.internalServerError('Error al obtener los meses ' + error);
  }
}
