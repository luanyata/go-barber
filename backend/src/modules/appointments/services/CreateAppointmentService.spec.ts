import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'
import AppError from '@shared/errors/AppError';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;;

describe('CreateAppointment', () => {
	beforeEach(() => {
		fakeAppointmentRepository = new FakeAppointmentRepository();
		createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
	})


	it('should be able to create a new appointment', async () => {
		const appointment = await createAppointment.execute({
			date: new Date(),
			providerId: '123123'
		})

		expect(appointment).toHaveProperty('id')
		expect(appointment.providerId).toBe('123123')
	})


	it('should not be able to create two appointment on the same time', async () => {
		const appointmentDate = new Date(2020, 4, 10, 11)

		await createAppointment.execute({
			date: appointmentDate,
			providerId: '123123'
		})

		expect(createAppointment.execute({
			date: appointmentDate,
			providerId: '123123'
		})).rejects.toBeInstanceOf(AppError)

	})
})
