import { Repository, getRepository, Raw } from 'typeorm';
import Appointment from '../entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
	private ormRepository: Repository<Appointment>

	constructor() {
		this.ormRepository = getRepository(Appointment)
	}


	public async create({ date, providerId }: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = this.ormRepository.create({ providerId, date });
		await this.ormRepository.save(appointment)

		return appointment
	}

	public async findByDate(date: Date): Promise<Appointment | undefined> {
		const findAppointment = await this.ormRepository.findOne({
			where: { date },
		});

		return findAppointment;
	}

	public async findAllInDayFromProvider({ providerId, day, month, year }
		: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {

		const parseDay = String(day).padStart(2, '0');
		const parseMonth = String(month).padStart(2, '0');

		const appointments = await this.ormRepository.find({
			where: {
				providerId,
				date: Raw(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parseDay}-${parseMonth}-${year}'`)
			}
		})

		return appointments;
	}

	public async findAllInMonthFromProvider({ providerId, month, year }
		: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {

		const parseMonth = String(month).padStart(2, '0');

		const appointments = await this.ormRepository.find({
			where: {
				providerId,
				date: Raw(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parseMonth}-${year}'`)
			}
		})

		return appointments;
	}
}

export default AppointmentsRepository;
