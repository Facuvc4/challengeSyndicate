import { Schema } from 'mongoose';

const paymentsStatusSchema = new Schema(
  {
    affiliate_id: { type: Number, required: true, min: 0 },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: true,
      min: 2000,
      max: 2024,
    },
    status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  },
  { versionKey: false } // Opcional, elimina el campo `__v`
);

export default paymentsStatusSchema;
