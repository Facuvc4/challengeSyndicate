import { Response } from 'express';

const main = async (err: any, res: Response) => {
  res.status(err.httpStatus || 500).send({
    err,
  });
};

export default main;
