import mongoose, { Schema, Model, Document } from 'mongoose';

type PassengerDocument = Document & {
  name: string;
  surname: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  trips: string[];
};

type PassengerInput = {
  name: PassengerDocument['name'];
  surname: PassengerDocument['surname'];
  dateOfBirth: PassengerDocument['dateOfBirth'];
  email: PassengerDocument['email'];
  phone: PassengerDocument['phone'];
};

const passengerSchema = new Schema(
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
    trips: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
      },
    ],
  },
  {
    collection: 'passengers',
    timestamps: true,
  },
);

const Passenger: Model<PassengerDocument> = mongoose.model<PassengerDocument>('Passenger', passengerSchema);

export { Passenger, PassengerInput, PassengerDocument };
