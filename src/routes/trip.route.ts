import { Router } from 'express';
import { createTrip, deleteTrip, getAllTrips, getTrip, updateTrip } from 'src/controller/trip.controller';

const tripRoute = () => {
  const router = Router();

  router.post('/trips', createTrip);

  router.get('/trips', getAllTrips);

  router.get('/trips/:id', getTrip);

  router.put('/trips/:id', updateTrip);

  router.delete('/trips/:id', deleteTrip);

  return router;
};

export default tripRoute;
