import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityControler from '../controllers/ProviderMonthAvailabilityControler';
import ProviderDayAvailabilityControler from '../controllers/ProviderDayAvailabilityControler';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityControler = new ProviderMonthAvailabilityControler();
const providerDayAvailabilityControler = new ProviderDayAvailabilityControler();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:providerId/month-availability',
  providerMonthAvailabilityControler.index,
);

providersRouter.get(
  '/:providerId/day-availability',
  providerDayAvailabilityControler.index,
);

export default providersRouter;
