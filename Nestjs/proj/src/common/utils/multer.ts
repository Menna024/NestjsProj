import { diskStorage } from 'multer';
export const multerOption = (destination: string, fileName: string) => {
  const storage = diskStorage({
    destination: './src§/uploads/brands',
    filename: (req, file, cb) => {
      const uniqueFilename = Date.now() + '-' + file.originalname;
      cb(null, uniqueFilename);
    },
  });

  return storage;
};
