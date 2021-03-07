import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProfileController from '../controllers/ProfileController';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticate);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      oldPassword: Joi.string(),
      password: Joi.string(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
