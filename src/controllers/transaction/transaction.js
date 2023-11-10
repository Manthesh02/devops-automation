import Transaction from "../../models/Transaction.js";
import Payments from "../../models/Payment.js";
import wallet from "../../models/Wallet.js";
import Razorpay from "razorpay";
const { raz_key_id, raz_key_secret } = process.env;
import crypto from "crypto";
import dotenv from 'dotenv';
dotenv.config();

export const initiatePayment = async (req, res) => {
  try {
    let amount = parseInt(req.query.amount);
    const { userId } = req.user;

    // const fetchData = await wallet.findOne({ user_id:userId });

    // if (fetchData != null) {
    //   var total_balance = fetchData.total_balance + amount;
      var type = "RAZ";
      const date = new Date();
      const result = date.getTime();
      var instance = new Razorpay({
        key_id: raz_key_id,
        key_secret: raz_key_secret,
      });
      var options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `order_rcptid_${result}`,
      };

      const order = await new Promise((resolve, reject) => {
        instance.orders.create(options, (err, order) => {
            if (err) {
                console.error(err);
                reject('Error creating Razorpay order');
            } else {
                resolve(order);
            }
        });
    });
    console.log(order)
    await Payments.updateOne(
        { receipt: order.receipt },
        {
            $set: {
                order_id: order.id,
                entity: order.entity,
                amount,
                receipt: order.receipt,
                status: order.status,
                user_id:userId,
            },
        },
        { upsert: true },
    );

      var data = { key_id: raz_key_id, key_secret: raz_key_secret };
      res.send({
        status_code: true,
        order,
        data,
      });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong. Please try again");
  }
};

export const verifyPayment = async (req, res) => {
    try {
        const body = `${req.body.response.razorpay_order_id}|${req.body.response.razorpay_payment_id}`;
        const expectedSignature = crypto
            .createHmac("sha256", raz_key_secret)
            .update(body.toString())
            .digest("hex");

        const response = { signatureIsValid: false };

        if (expectedSignature === req.body.response.razorpay_signature) {
            response.signatureIsValid = true;

            const invoice_number = `RAZ${Date.now()}`;
            
            await Payments.updateOne({ receipt: req.body.receipt }, { $set: { status: "paid" } });

            const data = await Payments.findOne({ receipt: req.body.receipt });

            const { amount, user_id } = data;

            const walletDetail = await wallet.findOne({ user_id });

                await wallet.updateOne(
                    { user_id },
                    {
                        $set: {
                            total_balance: walletDetail.total_balance + amount,
                        },
                    }
                ),
                await Transaction.create({
                    user_id,
                    description: "razorpay payment",
                    point_type: "RAZ",
                    transaction_id: req.body.response.razorpay_payment_id,
                    invoice_number,
                    amount,
                    transaction_type: "add",
                    state: "Delhi",
                })
                
        } else {
            await Payments.updateOne({ receipt: req.body.receipt }, { $set: { status: "failure" } });
        }

        res.json({
            signatureIsValid: response.signatureIsValid
        });
    } catch (error) {
        console.error(error);
        res.status(500).json("Something went wrong. Please try again");
    }
};
