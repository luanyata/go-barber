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

		await fakeAppointmentsRepository.create({
			date: new Date(2020, 4, 20, 8, 0, 0),
			providerId: "user",
		})

		await fakeAppointmentsRepository.create({
			date: new Date(2020, 4, 20, 9, 0, 0),
			providerId: "user",
		})

		await fakeAppointmentsRepository.create({
			date: new Date(2020, 4, 20, 10, 0, 0),
			providerId: "user",
		})

		await fakeAppointmentsRepository.create({
			date: new Date(2020, 4, 20, 11, 0, 0),
			providerId: "user",
		})

		await fakeAppointmentsRepository.create({
			date: new Date(2020, 4, 20, 12, 0, 0),
			providerId: "user",
		})

		await fakeAppointmentsRepository.create({
			date: new Date(2020, 4, 20, 13, 0, 0),
			providerId: "user",
		})

		await fakeAppointmentsRepository.create({
			date: new Date(2020, 4, 20, 14, 0, 0),
			providerId: "user",
		})

		await fakeAppointmentsRepository.create({
			date: new Date(2020, 4, 20, 15, 0, 0),
			providerId: "user",
		})

		await fakeAppointmentsRepository.create({
			date: new Date(2020, 4, 20, 16, 0, 0),
			providerId: "user",
		})

		await fakeAppointmentsRepository.create({
			date: new Date(2020, 4, 20, 17, 0, 0),
			providerId: "user",
		})

		const availability = await listProvidersMonthAvailabilityService.execute({
			providerId: "user",
			year: 2020,
			month: 5
		})

		expect(availability).toEqual(expect.arrayContaining([
			{ day: 19, available: true },
			{ day: 20, available: false },
			{ day: 21, available: true },
			{ day: 22, available: true },
		]))

	})
})
