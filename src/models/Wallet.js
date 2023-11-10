import mongoose from "mongoose";

const schema = mongoose.Schema;

const walletSchema = new schema({
    user_id: {
        type: String,
    },
    total_balance: {
        type: Number,
        default: 0,
    },
    total_withdrawl: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });



const wallet = mongoose.model("wallet", walletSchema);

export default wallet;