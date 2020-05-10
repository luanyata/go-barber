import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository"
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import UpdateUserAvatarService from "./UpdateUserAvatarService";
import AppError from "@shared/errors/AppError";

describe('UpdateUserAvatar', () => {
	it('Should be able to update avatar', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();

		const updateUserAvater = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider
		)

		const user = await fakeUsersRepository.create({
			name: 'Luan Lima',
			email: 'luanyata@gmail.com',
			password: '123456'
		})

		await updateUserAvater.execute({
			userId: user.id,
			fileName: 'avatar.jpg'
		})

		expect(user.avatar).toBe('avatar.jpg')
	})

	it('Should not be able to update avatar from non existing user', () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();

		const updateUserAvater = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider
		)

		expect(updateUserAvater.execute({
			userId: 'non-existing-user',
			fileName: 'avatar.jpg'
		})).rejects.toBeInstanceOf(AppError)

	})

	it('Should delete old avatar when updating new one', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();

		const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

		const updateUserAvater = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider
		)

		const user = await fakeUsersRepository.create({
			name: 'Luan Lima',
			email: 'luanyata@gmail.com',
			password: '123456'
		})

		await updateUserAvater.execute({
			userId: user.id,
			fileName: 'avatar.jpg'
		})

		await updateUserAvater.execute({
			userId: user.id,
			fileName: 'avatar2.jpg'
		})

		expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
		expect(user.avatar).toBe('avatar2.jpg')
	})

})
