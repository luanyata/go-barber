import { uuid } from 'uuidv4';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '../IUserTokensRepository';

class FakeUserTokenRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.userTokens.find(userToken => token === userToken.token);
  }
}

export default FakeUserTokenRepository;
