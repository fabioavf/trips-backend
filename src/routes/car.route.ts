import { Router } from 'express';
import { createCar, deleteCar, getAllCars, getCar, updateCar } from 'src/controller/car.controller';

const carRoute = () => {
  const router = Router();

  router.post('/cars', createCar);

  router.get('/cars', getAllCars);

  router.get('/cars/:id', getCar);

  router.put('/cars/:id', updateCar);

  router.delete('/cars/:id', deleteCar);

  return router;
};

export default carRoute;
