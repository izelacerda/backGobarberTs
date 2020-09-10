import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      profile: 1,
    });
    const profileUser = await showProfile.execute({
      user_id: user.id,
    });
    expect(profileUser.name).toBe('John Doe');
    expect(profileUser.email).toBe('johndoe@example.com');
  });
  it('should not be able to show profile for non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: -1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
