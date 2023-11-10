import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
user_id: {
    type: String,
},
description: {
    type: String,
},
invoice_number: {
    type: String,
},
amount: {
    type: Number,
},
transaction_type: {
    type: String,
},
point_type: {
    type: String,
},
transaction_id: {
    type: String,
    default: 'NA',
},
state: {
    type: String,
},
state: {
    type: String,
}
},{ timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

// Export the Transaction model
export default Transaction;
