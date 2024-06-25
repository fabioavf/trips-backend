import { Router } from 'express';
import { createDriver, deleteDriver, getAllDrivers, getDriver, updateDriver } from 'src/controller/driver.controller';

const driverRoute = () => {
  const router = Router();

  router.post('/drivers', createDriver);

  router.get('/drivers', getAllDrivers);

  router.get('/drivers/:id', getDriver);

  router.put('/drivers/:id', updateDriver);

  router.delete('/drivers/:id', deleteDriver);

  return router;
};

export default driverRoute;
