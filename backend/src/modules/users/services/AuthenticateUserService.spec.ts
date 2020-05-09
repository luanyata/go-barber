
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError';
import AuthenticateService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateService(fakeUserRepository, fakeHashProvider);

    await createUser.execute({
      name: 'Luan Lima',
      email: 'luanyata@gmail.com',
      password: '12345'
    })

    const response = await authenticateUser.execute({
      email: 'luanyata@gmail.com',
      password: '12345'
    })

    expect(response).toHaveProperty('token')
  })

  it('should not be able to authenticate with non existing user', () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider()
    const authenticateUser = new AuthenticateService(fakeUserRepository, fakeHashProvider);

    expect(authenticateUser.execute({
      email: 'luanyata@gmail.com',
      password: '12345'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateService(fakeUserRepository, fakeHashProvider);

    await createUser.execute({
      name: 'Luan Lima',
      email: 'luanyata@gmail.com',
      password: '12345'
    })

    expect(authenticateUser.execute({
      email: 'luanyata@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)

  })
})
