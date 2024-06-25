import mongoose, { Schema, Model, Document } from 'mongoose';

type CarDocument = Document & {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
};

type CarInput = {
  make: CarDocument['make'];
  model: CarDocument['model'];
  year: CarDocument['year'];
  licensePlate: CarDocument['licensePlate'];
};

const carSchema = new Schema(
  {
    make: {
      type: Schema.Types.String,
      required: true,
    },
    model: {
      type: Schema.Types.String,
      required: true,
    },
    year: {
      type: Schema.Types.Number,
      required: true,
    },
    licensePlate: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: 'cars',
    timestamps: true,
  },
);

const Car: Model<CarDocument> = mongoose.model<CarDocument>('Car', carSchema);

export { Car, CarInput, CarDocument };
