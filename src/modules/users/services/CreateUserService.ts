import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  password: string;
  email: string;
  profile: number;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    password,
    email,
    profile,
  }: IRequest): Promise<User> {
    const checkUser = await this.usersRepository.findByEmail(email);

    if (checkUser) {
      throw new AppError('Email ja cadastrado por outro usuario');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
      profile,
    });
    await this.cacheProvider.invalidatePrefix('providers-list');
    return user;
  }
}
export default CreateUserService;
