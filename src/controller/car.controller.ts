import { Request, Response } from 'express';
import { Car, CarInput } from '../models/car.model';

const createCar = async (req: Request, res: Response) => {
  const { licensePlate, make, model, year } = req.body as CarInput;

  if (!make || !model || !year || !licensePlate) {
    return res.status(422).json({ message: 'The fields make, model, year and licensePlate are required' });
  }

  const carInput: CarInput = {
    make,
    model,
    year,
    licensePlate,
  };

  const carCreated = await Car.create(carInput);

  return res.status(201).json(carCreated);
};

const getAllCars = async (req: Request, res: Response) => {
  const cars = await Car.find().sort({ createdAt: -1 }).exec();

  return res.status(200).json(cars);
};

const getCar = async (req: Request, res: Response) => {
  const { id } = req.params;

  const car = await Car.findById(id).exec();

  if (!car) {
    return res.status(404).json({ message: 'Car not found' });
  }

  return res.status(200).json(car);
};

const updateCar = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { licensePlate, make, model, year } = req.body as CarInput;

  const car = await Car.findById(id).exec();

  if (!car) {
    return res.status(404).json({ message: 'Car not found' });
  }

  if (!make || !model || !year || !licensePlate) {
    return res.status(422).json({ message: 'The fields make, model, year and licensePlate are required' });
  }

  await Car.findByIdAndUpdate(id, { make, model, year, licensePlate }).exec();

  return res.status(200).json({ message: 'Car updated' });
};

const deleteCar = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Car.findByIdAndDelete(id).exec();

  return res.status(200).json({ message: 'Car deleted' });
};

export { createCar, getAllCars, getCar, updateCar, deleteCar };
