import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProvidersAppointmentsService from './ListProviderAppointmentsService';

let listProvidersAppointmentsService: ListProvidersAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersAppointmentsService = new ListProvidersAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('Should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 8, 0, 0),
      providerId: 'providerId',
      userId: '123456',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 9, 0, 0),
      providerId: 'providerId',
      userId: '123456',
    });

    const appoitmentsDay = await listProvidersAppointmentsService.execute({
      providerId: 'providerId',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appoitmentsDay).toEqual([appointment1, appointment2]);
  });
});
