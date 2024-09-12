import { Router } from 'express';
import { uploadFileController } from '../controllers/index.controller';
import upload from '../helpers/file/create.helper';

export const fileRouter = Router();

fileRouter.post(
  '/upload/:year/:month',
  upload.single('file'),
  uploadFileController
);

export default fileRouter;
