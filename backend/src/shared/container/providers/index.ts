import { container } from "tsyringe";
import IStorageProvider from "./StorageProvider/models/IStorageProvider";
import DiskStoregeProvider from "./StorageProvider/implementations/DiskStorageProvider";

container.registerSingleton<IStorageProvider>('StorageProvier', DiskStoregeProvider)
