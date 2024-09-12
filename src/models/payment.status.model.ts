import mongoose from 'mongoose';
import paymentsStatusSchema from '../schemas/payment.status.schema';

const PaymentsStatus = mongoose.model('PaymentsStatus', paymentsStatusSchema);

export default PaymentsStatus;
