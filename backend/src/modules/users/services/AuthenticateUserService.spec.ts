
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError';
import AuthenticateService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';


let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateService;

describe('AuthenticateUser', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider()
		createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
		authenticateUser = new AuthenticateService(fakeUserRepository, fakeHashProvider);
	})


	it('should be able to authenticate', async () => {

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

	it('should not be able to authenticate with non existing user', async () => {

		await expect(authenticateUser.execute({
			email: 'luanyata@gmail.com',
			password: '12345'
		})).rejects.toBeInstanceOf(AppError)
	})

	it('should not be able to authenticate with wrong password', async () => {

		await createUser.execute({
			name: 'Luan Lima',
			email: 'luanyata@gmail.com',
			password: '12345'
		})

		await expect(authenticateUser.execute({
			email: 'luanyata@gmail.com',
			password: '123456'
		})).rejects.toBeInstanceOf(AppError)
	})
})
