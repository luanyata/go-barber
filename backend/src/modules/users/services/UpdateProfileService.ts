import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
      throw new AppError('E-mail already in user');
    }

    user.name = name;
    user.email = email;

    if (password && !oldPassword) {
      throw new AppError(
        'You need to inform he old passwordto set new password',
      );
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError(
          'You need to inform he old passwordto set new password',
        );
      }
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
