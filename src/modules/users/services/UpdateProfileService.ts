import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: number;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  profile: number;
}
@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
    profile,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User does not exist');
    }
    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);
    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
      throw new AppError('E-mail already in use!');
    }
    user.name = name;
    user.email = email;
    user.profile = profile || user.profile;
    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }
    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );
      if (!checkOldPassword) {
        throw new AppError('Old Password does not match');
      }
      user.password = await this.hashProvider.generateHash(password);
    }
    this.usersRepository.save(user);
    return user;
  }
}

export default UpdateProfileService;
