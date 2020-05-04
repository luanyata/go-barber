import { parseISO } from 'date-fns';
import { Request, Response, Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';


const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request: Request, response: Response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();
  return response.status(200).json(appointments);
});

appointmentsRouter.post('/', async (request: Request, response: Response) => {
  const { providerId, date } = request.body;

  const parseDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    providerId,
    date: parseDate,
  });

  return response.status(200).json(appointment);
});

export default appointmentsRouter;
