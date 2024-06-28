import { Request, Response } from 'express';
import { Trip, TripInput } from '../models/trip.model';

const createTrip = async (req: Request, res: Response) => {
  const { destination, driver, origin, passenger, time } = req.body as TripInput;

  if (!destination || !driver || !passenger || !origin || !time) {
    return res.status(422).json({ message: 'The fields destination, driver, passenger, time and origin are required' });
  }

  const tripInput: TripInput = {
    destination,
    driver,
    passenger,
    origin,
    time,
  };

  const tripCreated = await Trip.create(tripInput);

  return res.status(201).json(tripCreated);
};

const getAllTrips = async (req: Request, res: Response) => {
  const trips = await Trip.find().sort({ createdAt: -1 }).exec();

  return res.status(200).json(trips);
};

const getTrip = async (req: Request, res: Response) => {
  const { id } = req.params;

  const trip = await Trip.findById(id).exec();

  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }

  return res.status(200).json(trip);
};

const updateTrip = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { destination, driver, origin, passenger } = req.body as TripInput;

  const trip = await Trip.findById(id).exec();

  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }

  if (!destination || !driver || !passenger || !origin) {
    return res.status(422).json({ message: 'The fields destination, driver, passenger and origin are required' });
  }

  await Trip.findByIdAndUpdate(id, { destination, driver, passenger, origin }).exec();

  return res.status(200).json({ message: 'Trip updated' });
};

const startTrip = async (req: Request, res: Response) => {
  const { id } = req.params;

  const trip = await Trip.findById(id).exec();

  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }

  await Trip.findByIdAndUpdate(id, { started: true }).exec();

  return res.status(200).json({ message: 'Trip started' });
};

const concludeTrip = async (req: Request, res: Response) => {
  const { id } = req.params;

  const trip = await Trip.findById(id).exec();

  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }

  await Trip.findByIdAndUpdate(id, { concluded: true }).exec();

  return res.status(200).json({ message: 'Trip concluded' });
};

const deleteTrip = async (req: Request, res: Response) => {
  const { id } = req.params;

  const trip = await Trip.findById(id).exec();

  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }

  await Trip.findByIdAndDelete(id).exec();

  return res.status(200).json({ message: 'Trip deleted' });
};

export { createTrip, getAllTrips, getTrip, updateTrip, startTrip, concludeTrip, deleteTrip };
