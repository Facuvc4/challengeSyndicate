import mongoose from 'mongoose';
import afiliadoSchema from '../schemas/affiliate.schema';

const Affiliate = mongoose.model('Affiliate', afiliadoSchema);

export default Affiliate;
