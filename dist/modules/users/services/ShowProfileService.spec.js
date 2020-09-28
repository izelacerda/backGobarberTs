"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let showProfile;
describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    showProfile = new _ShowProfileService.default(fakeUsersRepository);
  });
  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      profile: 1
    });
    const profileUser = await showProfile.execute({
      user_id: user.id
    });
    expect(profileUser.name).toBe('John Doe');
    expect(profileUser.email).toBe('johndoe@example.com');
  });
  it('should not be able to show profile for non-existing user', async () => {
    await expect(showProfile.execute({
      user_id: -1
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});