import Affiliate from '../../models/affiliate.model';
import errorHelper from '../error.helper';

export async function getAffiliates() {
  try {
    const results = await Affiliate.find({});
    return results;
  } catch (error) {
    errorHelper.internalServerError('Error al obtener los afiliados ' + error);
  }
}
