import nodemailer from 'nodemailer';
import { getDesactivatedAffiliates } from '../helpers/affiliate/get.desactivated.helper';

const notifiedAffiliates = new Set();

export async function sendEmail() {
  const desactivatedAffiliates = await getDesactivatedAffiliates();
  const affiliatesToNotify = Array.from(desactivatedAffiliates).filter(
    ([id]) => !notifiedAffiliates.has(id)
  );

  if (affiliatesToNotify.length === 0) {
    console.log('No hay afiliados para notificar su baja.');
    return;
  }

  const affiliateNames = affiliatesToNotify
    .map(([id, name]) => name)
    .join(', ');

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'facundolopez026@gmail.com',
      pass: process.env.GMAIL_KEY,
    },
  });

  let mailOptions = {
    from: 'facundolopez026@gmail.com',
    to: 'lopezitochavesfacuvc@gmail.com',
    subject: 'Afiliados dados de baja',
    text: `Los siguientes afiliados han sido dados de baja: ${affiliateNames}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error al enviar el correo: ', error);
    } else {
      console.log('Correo enviado: ' + info.response);

      affiliatesToNotify.forEach(([id]) => notifiedAffiliates.add(id));
      console.log('Afiliados notificados:', affiliateNames);
    }
  });
}
