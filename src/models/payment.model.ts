import mongoose from 'mongoose';
import paymentSchema from '../schemas/payment.schema';

const Payments = mongoose.model('Payments', paymentSchema);

export default Payments;
