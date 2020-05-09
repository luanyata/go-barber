import { Request, Response } from 'express'
import { parseISO } from "date-fns";
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';


export default class AppointmentsController {
  public async  create(request: Request, response: Response): Promise<Response> {
    const { providerId, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      providerId,
      date: parseDate,
    });

    return response.status(200).json(appointment);
  }
}
