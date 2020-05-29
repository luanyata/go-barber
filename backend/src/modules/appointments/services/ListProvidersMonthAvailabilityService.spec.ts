import ListProvidersMonthAvailabilityService from "./ListProvidersMonthAvailabilityService"
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository"

let listProvidersMonthAvailabilityService: ListProvidersMonthAvailabilityService
let fakeAppointmentsRepository: FakeAppointmentsRepository

describe('ListProviderMonthAvailability', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		listProvidersMonthAvailabilityService = new ListProvidersMonthAvailabilityService(fakeAppointmentsRepository)
	})

	it('Should be able to list the month availability from provider', async () => {

		for (let index = 0; index === 10; index++) {
			await fakeAppointmentsRepository.create({
				providerId: "user",
				date: new Date(2020, 3, 20, 8 + index, 0, 0)
			})

		}



		// await fakeAppointmentsRepository.create({
		// 	providerId: "user",
		// 	date: new Date(2020, 4, 20, 8, 0, 0)
		// })

		// await fakeAppointmentsRepository.create({
		// 	providerId: "user",
		// 	date: new Date(2020, 4, 20, 10, 0, 0)
		// })

		// await fakeAppointmentsRepository.create({
		// 	providerId: "user",
		// 	date: new Date(2020, 4, 21, 8, 0, 0)
		// })

		const availability = await listProvidersMonthAvailabilityService.execute({
			providerId: "user",
			year: 2020,
			month: 5
		})

		expect(availability).toEqual(expect.arrayContaining([
			{ day: 19, availability: true },
			{ day: 20, availability: false },
			{ day: 21, availability: true },
			{ day: 22, availability: true },
		]))

	})
})
