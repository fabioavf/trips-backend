import { Request, Response } from 'express';
import { Driver, DriverInput } from '../models/driver.model';

const createDriver = async (req: Request, res: Response) => {
  const { car, dateOfBirth, email, name, phone, surname } = req.body as DriverInput;

  if (!name || !surname || !dateOfBirth || !email || !phone || !car) {
    return res.status(422).json({ message: 'The fields name, surname, dateOfBirth, email, phone and car are required' });
  }

  const driverInput: DriverInput = {
    car,
    dateOfBirth,
    email,
    name,
    phone,
    surname,
  };

  const driverCreated = await Driver.create(driverInput);

  return res.status(201).json(driverCreated);
};

const getAllDrivers = async (req: Request, res: Response) => {
  const drivers = await Driver.find().sort({ createdAt: -1 }).exec();

  return res.status(200).json(drivers);
};

const getDriver = async (req: Request, res: Response) => {
  const { id } = req.params;

  const driver = await Driver.findById(id).exec();

  if (!driver) {
    return res.status(404).json({ message: 'Driver not found' });
  }

  return res.status(200).json(driver);
};

const updateDriver = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { car, dateOfBirth, email, name, phone, surname } = req.body as DriverInput;

  const driver = await Driver.findById(id).exec();

  if (!driver) {
    return res.status(404).json({ message: 'Driver not found' });
  }

  if (!name || !surname || !dateOfBirth || !email || !phone || !car) {
    return res.status(422).json({ message: 'The fields name, surname, dateOfBirth, email, phone and car are required' });
  }

  await Driver.findByIdAndUpdate(id, { car, dateOfBirth, email, name, phone, surname }).exec();

  return res.status(200).json({ message: 'Driver updated' });
};

const deleteDriver = async (req: Request, res: Response) => {
  const { id } = req.params;

  const driver = await Driver.findByIdAndDelete(id).exec();

  if (!driver) {
    return res.status(404).json({ message: 'Driver not found' });
  }

  return res.status(200).json({ message: 'Driver deleted' });
};

export { createDriver, getAllDrivers, getDriver, updateDriver, deleteDriver };
