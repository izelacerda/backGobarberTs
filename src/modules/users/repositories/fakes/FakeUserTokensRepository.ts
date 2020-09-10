import { v4 as uuidv4 } from 'uuid';
import IUsersTokenRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUsersTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: number): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      id: this.userTokens.length + 1,
      token: uuidv4(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    );
    return userToken;
  }
}

export default FakeUserTokensRepository;
