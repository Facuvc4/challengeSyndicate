import { Schema } from 'mongoose';

const affiliateSchema = new Schema(
  {
    dni: { type: String, required: true, unique: true, min: 0 },
    _id: { type: Number, required: true, unique: true, min: 0 },
    name: { type: String, required: true },
    affiliation_description: { type: String, required: true },
    unpaid_months_count: { type: Number, required: true, min: 0 },
  },
  { versionKey: false }
);

export default affiliateSchema;
