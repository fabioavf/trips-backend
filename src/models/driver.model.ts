import mongoose, { Schema, Model, Document } from 'mongoose';

type DriverDocument = Document & {
  name: string;
  surname: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  trips: string[];
  car: string;
  available: boolean;
};

type DriverInput = {
  name: DriverDocument['name'];
  surname: DriverDocument['surname'];
  dateOfBirth: DriverDocument['dateOfBirth'];
  email: DriverDocument['email'];
  phone: DriverDocument['phone'];
  car: DriverDocument['car'];
};

const driverSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    surname: {
      type: Schema.Types.String,
      required: true,
    },
    dateOfBirth: {
      type: Schema.Types.Date,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    phone: {
      type: Schema.Types.String,
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    available: {
      type: Schema.Types.Boolean,
      default: true,
    },
    trips: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
      },
    ],
  },
  {
    collection: 'drivers',
    timestamps: true,
  },
);

const Driver: Model<DriverDocument> = mongoose.model<DriverDocument>('Driver', driverSchema);

export { Driver, DriverInput, DriverDocument };
