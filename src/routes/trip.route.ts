import { Router } from 'express';
import { concludeTrip, createTrip, deleteTrip, getAllTrips, getTrip, startTrip, updateTrip } from '../controller/trip.controller';

const tripRoute = () => {
  const router = Router();

  router.post('/trips', createTrip);

  router.get('/trips', getAllTrips);

  router.get('/trips/:id', getTrip);

  router.put('/trips/:id', updateTrip);

  router.put('/trips/start/:id', startTrip);

  router.put('/trips/end/:id', concludeTrip);

  router.delete('/trips/:id', deleteTrip);

  return router;
};

export default tripRoute;
