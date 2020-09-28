"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      profile: 1
    });
    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tri',
      email: 'johntre@example.com',
      profile: 1
    });
    expect(updateUser.name).toBe('John Tri');
    expect(updateUser.email).toBe('johntre@example.com');
  });
  it('should be able to change another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      profile: 1
    });
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@example.com',
      password: '123456',
      profile: 1
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@example.com',
      profile: 1
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      profile: 1
    });
    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tri',
      email: 'johntri@example.com',
      old_password: '123456',
      password: '123123',
      profile: 1
    });
    await expect(updateUser.password).toBe('123123');
  });
  it('should not be able to update password with oldpassword', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      profile: 1
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Tri',
      email: 'johntri@example.com',
      password: '123123',
      profile: 1
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update password with wrong oldpassword', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      profile: 1
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Tri',
      email: 'johntri@example.com',
      old_password: 'wrond-old-password',
      password: '123123',
      profile: 1
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update profile for non-existing user', async () => {
    await expect(updateProfile.execute({
      user_id: -1,
      name: 'John Tri',
      email: 'johntri@example.com',
      old_password: 'wrond-old-password',
      password: '123123',
      profile: 1
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});