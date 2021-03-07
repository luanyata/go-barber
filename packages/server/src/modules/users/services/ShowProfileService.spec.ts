import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('Should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Luan Lima',
      email: 'luan@lima.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({ userId: user.id });

    expect(profile).toBe(user);
  });

  it('Should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({ userId: 'non-existing-user-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
