import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';


let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService
let fakeHashProvider: FakeHashProvider

describe('SendForgotPasswordEmail', () => {

	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
		fakeUserTokensRepository = new FakeUserTokenRepository()
		resetPasswordService = new ResetPasswordService(
			fakeUsersRepository,
			fakeUserTokensRepository,
			fakeHashProvider)
	})

	it('should be able to reset the password', async () => {

		const user = await fakeUsersRepository.create({
			name: 'Luan Lima',
			email: 'luanyata@gmail.com',
			password: '123456'
		})

		const { token } = await fakeUserTokensRepository.generate(user.id)

		const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

		await resetPasswordService.execute({
			token,
			password: '123123'
		})

		const updateUser = await fakeUsersRepository.findById(user.id)

		expect(generateHash).toBeCalledWith('123123')
		expect(updateUser?.password).toBe('123123')
	})


	it('shoul not be able to reset the password with non-existing  token', async () => {
		await expect(resetPasswordService.execute({ token: 'non-existing-token', password: '' }))
			.rejects.toBeInstanceOf(AppError)
	})

	it('shoul not be able to reset the password with non-existing  user', async () => {
		const { token } = await fakeUserTokensRepository.generate('non-existing-user')
		await expect(resetPasswordService.execute({ token, password: '' }))
			.rejects.toBeInstanceOf(AppError)
	})

	it('should not be able to reset password if passed more than 2 hours', async () => {

		const user = await fakeUsersRepository.create({
			name: 'Luan Lima',
			email: 'luanyata@gmail.com',
			password: '123456'
		})

		const { token } = await fakeUserTokensRepository.generate(user.id)

		jest.spyOn(Date, 'now').mockImplementation(() => {
			const customDate = new Date();
			return customDate.setHours(customDate.getHours() + 3)
		})

		await expect(resetPasswordService.execute({
			token,
			password: '123123'
		})).rejects.toBeInstanceOf(AppError)
	})
})
