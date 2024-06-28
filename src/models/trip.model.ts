import mongoose, { Schema, Model, Document } from 'mongoose';

type TripDocument = Document & {
  driver: string;
  passenger: string;
  origin: string;
  destination: string;
  time: Date;
  started: boolean;
  concluded: boolean;
};

type TripInput = {
  driver: TripDocument['driver'];
  passenger: TripDocument['passenger'];
  origin: TripDocument['origin'];
  destination: TripDocument['destination'];
  time: TripDocument['time'];
};

const tripSchema = new Schema(
  {
    driver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
    },
    passenger: {
      type: Schema.Types.ObjectId,
      ref: 'Passenger',
      required: true,
    },
    origin: {
      type: Schema.Types.String,
      required: true,
    },
    destination: {
      type: Schema.Types.String,
      required: true,
    },
    time: {
      type: Schema.Types.Date,
      required: true,
    },
    started: {
      type: Schema.Types.Boolean,
      default: false,
    },
    concluded: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    collection: 'trips',
    timestamps: true,
  },
);

const Trip: Model<TripDocument> = mongoose.model<TripDocument>('Trip', tripSchema);

export { Trip, TripInput, TripDocument };
