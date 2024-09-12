import { Schema } from 'mongoose';

const paymentSchema = new Schema(
  {
    affiliate_id: { type: Number, required: true, min: 0 },
    payment_date: { type: Date, required: true },
    payment_type_code: { type: Number, required: true, min: 0 },
    payment_type: { type: String, required: true },
    service_code: { type: Number, required: true, min: 0 },
    service_description: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    installments_number: { type: Number, required: true, min: 0 },
    percentage: { type: Number, required: true, min: 0 },
    union_code: { type: Number, required: true, min: 0 },
    sub_total: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    payment_reference: { type: String, required: true },
    identification_code: { type: String, required: true },
    pays: { type: Boolean, required: true },
  },
  { versionKey: false }
);

export default paymentSchema;
