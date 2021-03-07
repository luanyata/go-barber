import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersMonthAvailabilityService from '@modules/appointments/services/ListProvidersMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params;
    const { month, year } = request.query;

    const listProvidersMonthAvailability = container.resolve(
      ListProvidersMonthAvailabilityService,
    );

    const availability = await listProvidersMonthAvailability.execute({
      providerId,
      month: Number(month),
      year: Number(year),
    });

    return response.status(200).json(availability);
  }
}
