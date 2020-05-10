import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface Request {
	userId: string;
	fileName: string;
}

@injectable()
class UpdateUserAvatarService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('StorageProvider')
		private storageProvider: IStorageProvider,

	) { }

	public async execute({ userId, fileName }: Request): Promise<User> {

		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new AppError('Only authenticated users can change avatar.', 401);
		}

		if (user.avatar) {
			await this.storageProvider.deleteFile(user.avatar)
		}

		const avatatFileName = await this.storageProvider.saveFile(fileName)

		user.avatar = avatatFileName;
		await this.usersRepository.save(user);

		return user;
	}
}

export default UpdateUserAvatarService;
