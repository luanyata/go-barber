
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository"
import ListProvidersService from "./ListProvidersService"


let fakeUsersRepository: FakeUsersRepository
let listProvidersService: ListProvidersService

describe('ListProviders', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		listProvidersService = new ListProvidersService(fakeUsersRepository)

	})

	it('Should be able to show the profile', async () => {
		const user1 = await fakeUsersRepository.create({
			name: 'Luan Lima',
			email: 'luan@lima.com',
			password: '123456'
		})

		const user2 = await fakeUsersRepository.create({
			name: 'Fernanda Lima',
			email: 'fernanda@lima.com',
			password: '123456'
		})

		const user3 = await fakeUsersRepository.create({
			name: 'vitor Lima',
			email: 'vitor@lima.com',
			password: '123456'
		})

		const loggedUser = await fakeUsersRepository.create({
			name: 'Nina Lima',
			email: 'nina@lima.com',
			password: '123456'
		})

		const providers = await listProvidersService.execute({ userId: loggedUser.id })

		expect(providers).toEqual([user1, user2, user3]);

	})
})
