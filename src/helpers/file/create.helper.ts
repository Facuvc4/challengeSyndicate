import multer from 'multer';
import path from 'path';
import fs from 'fs';

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const year = req.params.year;
      const month = req.params.month;
      const destination = `./uploads/${year}/${month}`;
      const dir = path.resolve(destination);

      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) {
          console.error('Error al crear el directorio:', err);
          cb(err, destination); // Pasar el error al callback
        } else {
          cb(null, destination);
        }
      });
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

export default upload;
