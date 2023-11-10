import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    
    user_id: {
        type: String,
    },
    order_id: {
        type: String,
    },
    entity: {
        type: String,
    },
    amount: {
        type: Number,
    },
    currency: {
        type: String,
        default: 'INR',
    },
    receipt: {
        type: String,
    },
    status: {
        type: String,
    },
    attempts: {
        type: Number,
    },
    razorpay_payment_id: {
        type: String,
    },
    razorpay_order_id: {
        type: String,
    },
    razorpay_signature: {
        type: String,
    },
},{ timestamps: true });

const Payments= mongoose.model('Payments', paymentSchema);

// Export the Transaction model
export default Payments;
