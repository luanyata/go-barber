import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import path from 'path';

interface IStorageConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;
  multer: { storage: StorageEngine };
  // eslint-disable-next-line @typescript-eslint/ban-types
  config: { disk: {}; aws: { bucket: string } };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(16).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: { bucket: 'dev.yata.gobarber' },
  },
} as IStorageConfig;
