import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const providerId = request.user.id;

    const { day, month, year } = request.query;

    const listProviderAppoitments = container.resolve(
      ListProvidersAppointmentsService,
    );

    const availability = await listProviderAppoitments.execute({
      providerId,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.status(200).json(availability);
  }
}
