import { container } from 'tsyringe';
import IStorageProvider from './models/IStorageProvider';
import DiskStoregeProvider from './implementations/DiskStorageProvider';

const providers = {
  diskStorage: DiskStoregeProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.diskStorage,
);
