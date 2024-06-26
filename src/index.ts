import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './databaseConnection';
import carRoute from './routes/car.route';
import driverRoute from './routes/driver.route';
import passengerRoute from './routes/passenger.route';
import tripRoute from './routes/trip.route';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', carRoute);
app.use('/', driverRoute);
app.use('/', passengerRoute);
app.use('/', tripRoute);

app.listen(PORT, async () => {
  await connectToDatabase();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
