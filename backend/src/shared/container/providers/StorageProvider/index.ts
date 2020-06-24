import { container } from 'tsyringe';
import uploadConfig from '@config/storage';
import IStorageProvider from './models/IStorageProvider';
import DiskStoregeProvider from './implementations/DiskStorageProvider';

import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStoregeProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
