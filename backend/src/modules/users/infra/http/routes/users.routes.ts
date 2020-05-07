import { Request, Response, Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateAvatarUserService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersRepository from '../../typeorm/repositories/UsersRepositories';

const usersRouter = Router();
const upload = multer(uploadConfig);



usersRouter.post('/', async (request: Request, response: Response) => {
  const { name, email, password } = request.body;
  const userRepository = new UsersRepository()
  const createUser = new CreateUserService(userRepository);

  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request: Request, response: Response) => {
    const userRepository = new UsersRepository()
    const updateUserAvatar = new UpdateAvatarUserService(userRepository);

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      fileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
