import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService

describe('SendForgotPasswordEmail', () => {

	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeUserTokensRepository = new FakeUserTokenRepository()
		resetPasswordService = new ResetPasswordService(fakeUsersRepository, fakeUserTokensRepository)
	})


	it('should be able to reset the password', async () => {

		const user = await fakeUsersRepository.create({
			name: 'Luan Lima',
			email: 'luanyata@gmail.com',
			password: '123456'
		})

		const { token } = await fakeUserTokensRepository.generate(user.id)

		await resetPasswordService.execute({
			token,
			password: '123123'
		})

		const updateUser = await fakeUsersRepository.findById(user.id)

		expect(updateUser?.password).toBe('123123')
	})

	it('shoul not be to reset  password the invalid token', async () => {
		expect(resetPasswordService.execute({ token: 'non-token-exists', password: '' }))
			.rejects.toBeCalled()

	})
})
