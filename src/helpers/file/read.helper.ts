import fs from 'fs';
import path from 'path';
import moment from 'moment';
import errorHelper from '../error.helper';

const parseDate = (dateString: string): Date => {
  return moment(dateString, 'DD/MM/YYYY HH:mm:ss').toDate();
};

export function readFile(filePath: string) {
  try {
    const file = fs.readFileSync(path.resolve(filePath), 'utf-8');
    const lines = file.split('\n').filter((line) => line.trim() !== ''); // Filtrar por salto de espacio

    const data = lines.map((line) => {
      const fields = line.split('|').filter((field) => field.trim() !== ''); // Filtrar los campos vacías
      return {
        dni: fields[0].trim(),
        affiliate_id: fields[1].trim(),
        name: fields[2].trim(),
        affiliation_description: fields[14].trim(),
        payment_date: parseDate(fields[3]),
        payment_type_code: fields[4].trim(),
        payment_type: fields[5].trim(),
        service_code: fields[6].trim(),
        service_description: fields[7].trim(),
        amount: parseFloat(fields[8]),
        installments_number: parseInt(fields[9]),
        percentage: parseFloat(fields[10]),
        union_code: fields[11].trim(),
        sub_total: parseFloat(fields[12]),
        total: parseFloat(fields[13]),
        payment_reference: fields[15].trim(),
        identification_code: fields[16].trim(),
        pays: fields[17].toLowerCase() === 'true',
      };
    });
    return data;
  } catch (error) {
    errorHelper.badRequestError('Error al leer el archivo');
  }
}
