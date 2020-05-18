import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository"
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider"
import UpdateProfileService from "./UpdateProfileService"
import AppError from "@shared/errors/AppError"

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfileService: UpdateProfileService

describe('UpdateProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider()
		updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider)

	})

	it('Should be able to update profile', async () => {
		const user = await fakeUsersRepository.create({
			name: 'Luan Lima',
			email: 'luan@lima.com',
			password: '123456'
		})

		const updatedUser = await updateProfileService.execute({
			userId: user.id,
			name: 'Luan Yata',
			email: 'luan@yata.com'
		})

		expect(updatedUser?.name).toBe('Luan Yata')
		expect(updatedUser?.email).toBe('luan@yata.com')

	})

	it('Should not be able to update profile not found', async () => {
		await expect(updateProfileService.execute({
			userId: 'no-exist-user-id',
			name: 'Luan Yata',
			email: 'luan@yata.com'
		})).rejects.toBeInstanceOf(AppError)
	})

	it('Should not be able to change to another user email', async () => {

		await fakeUsersRepository.create({
			name: 'Ana Maria Lima',
			email: 'ana@lima.com',
			password: '123456'
		})

		const user = await fakeUsersRepository.create({
			name: 'Ana Claudia Lima',
			email: 'ana@claudia.com',
			password: '123456'
		})

		await expect(updateProfileService.execute({
			userId: user.id,
			name: 'Ana Claudia Lima',
			email: 'ana@lima.com'
		})).rejects.toBeInstanceOf(AppError)

	})

	it('Should be able to update password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'Luan Lima',
			email: 'luan@lima.com',
			password: '123456'
		})

		const updatedUser = await updateProfileService.execute({
			userId: user.id,
			name: 'Luan Yata',
			email: 'luan@yata.com',
			password: '123123',
			oldPassword: '123456'
		})

		expect(updatedUser.password).toBe('123123')
	})

	it('Should not be able to update password without old password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'Luan Lima',
			email: 'luan@lima.com',
			password: '123456'
		})

		await expect(updateProfileService.execute({
			userId: user.id,
			name: 'Luan Yata',
			email: 'luan@yata.com',
			password: '123123',

		})).rejects.toBeInstanceOf(AppError)
	})

	it('Should not be able to update password with wrong old password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'Luan Lima',
			email: 'luan@lima.com',
			password: '123456'
		})

		await expect(updateProfileService.execute({
			userId: user.id,
			name: 'Luan Yata',
			email: 'luan@yata.com',
			password: '123123',
			oldPassword: 'wrong-old-password'

		})).rejects.toBeInstanceOf(AppError)
	})
})
