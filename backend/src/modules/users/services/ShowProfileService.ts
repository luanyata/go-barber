import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
	userId: string;

}

@injectable()
class ShowProfileService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) { }

	public async execute({ userId }: IRequest): Promise<User> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new AppError('User not found');
		}

		return user
	}
}

export default ShowProfileService;
