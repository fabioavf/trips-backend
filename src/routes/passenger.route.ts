import { Router } from 'express';
import { createPassenger, deletePassenger, getAllPassengers, getPassenger, updatePassenger } from 'src/controller/passenger.controller';

const passengerRoute = () => {
  const router = Router();

  router.post('/passengers', createPassenger);

  router.get('/passengers', getAllPassengers);

  router.get('/passengers/:id', getPassenger);

  router.put('/passengers/:id', updatePassenger);

  router.delete('/passengers/:id', deletePassenger);

  return router;
};

export default passengerRoute;
