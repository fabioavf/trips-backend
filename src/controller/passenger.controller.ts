import { Request, Response } from 'express';
import { Passenger, PassengerInput } from '../models/passenger.model';

const createPassenger = async (req: Request, res: Response) => {
  const { dateOfBirth, email, name, phone, surname } = req.body as PassengerInput;

  if (!name || !surname || !dateOfBirth || !email || !phone) {
    return res.status(422).json({ message: 'The fields name, surname, dateOfBirth, email and phone are required' });
  }

  const passengerInput: PassengerInput = {
    dateOfBirth,
    email,
    name,
    phone,
    surname,
  };

  const passengerCreated = await Passenger.create(passengerInput);

  return res.status(201).json(passengerCreated);
};

const getAllPassengers = async (req: Request, res: Response) => {
  const passengers = await Passenger.find().sort({ createdAt: -1 }).exec();

  return res.status(200).json(passengers);
};

const getPassenger = async (req: Request, res: Response) => {
  const { id } = req.params;

  const passenger = await Passenger.findById(id).exec();

  if (!passenger) {
    return res.status(404).json({ message: 'Passenger not found' });
  }

  return res.status(200).json(passenger);
};

const updatePassenger = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { dateOfBirth, email, name, phone, surname } = req.body as PassengerInput;

  const passenger = await Passenger.findById(id).exec();

  if (!passenger) {
    return res.status(404).json({ message: 'Passenger not found' });
  }

  if (!name || !surname || !dateOfBirth || !email || !phone) {
    return res.status(422).json({ message: 'The fields name, surname, dateOfBirth, email and phone are required' });
  }

  await Passenger.findByIdAndUpdate(id, { dateOfBirth, email, name, phone, surname }).exec();

  return res.status(200).json({ message: 'Passenger updated' });
};

const deletePassenger = async (req: Request, res: Response) => {
  const { id } = req.params;

  const passenger = await Passenger.findById(id).exec();

  if (!passenger) {
    return res.status(404).json({ message: 'Passenger not found' });
  }

  await Passenger.findByIdAndDelete(id).exec();

  return res.status(200).json({ message: 'Passenger deleted' });
};

export { createPassenger, getAllPassengers, getPassenger, updatePassenger, deletePassenger };
