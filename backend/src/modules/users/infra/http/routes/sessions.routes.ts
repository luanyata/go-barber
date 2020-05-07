import { Request, Response, Router } from 'express';

import AuthenticateService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepositories';

const sessionsRouter = Router();


sessionsRouter.post('/', async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const userRepository = new UsersRepository();
  const authenticateUser = new AuthenticateService(userRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
