import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns'
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { isUuid } from 'uuidv4'

interface IRequest {
	token: string;
	password: string
}

@injectable()
class ResetPasswordService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('UserTokensRepository')
		private userTokensRepository: IUserTokensRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider

	) { }

	public async execute({ token, password }: IRequest): Promise<void> {


		if (!isUuid(token)) {
			throw new AppError('Token invalid')
		}

		const userToken = await this.userTokensRepository.findByToken(token);

		if (!userToken) {
			throw new AppError('User token does not exists')
		}

		const user = await this.usersRepository.findById(userToken.userId);

		if (!user) {
			throw new AppError('User does not exists')
		}

		const tokenCreateAt = userToken.createdAt;
		const compareDate = addHours(tokenCreateAt, 2)

		if (isAfter(Date.now(), compareDate)) {
			throw new AppError('Token expired')
		}

		user.password = await this.hashProvider.generateHash(password);

		await this.usersRepository.save(user)
	}
}

export default ResetPasswordService;