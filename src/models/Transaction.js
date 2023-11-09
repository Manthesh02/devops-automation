import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
  fromCountry: {
    type: String,
    required: true,
  },
  toCountry: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  amountType: {
    type: String,
    required: true,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Export the Transaction model
export default Transaction;
