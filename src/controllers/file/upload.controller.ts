import { Request, Response, NextFunction } from 'express';
import { readFile } from '../../helpers/file/read.helper';
import { uploadFile } from '../../services/upload.file.service';
import { registerUnpaid } from '../../services/register.unpaid.service';
import { sendEmail } from '../../services/send.email.service';

const main = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await readFile(req.file?.path ?? '');
    await uploadFile(
      data,
      parseInt(req.params.month),
      parseInt(req.params.year)
    );
    await registerUnpaid(parseInt(req.params.year));
    await sendEmail();
    res.send('El archivo fue procesado correctamente').status(200);
  } catch (error) {
    next(error);
  }
};

export default main;
