import Transaction from '../../models/Transaction.js';

export const postTransaction = async (req, res) => {
  try {
    const { fromCountry, toCountry, transactionType, amount, amountType } = req.body;
    const { userId } = req.user;
    const newTransaction = new Transaction({
      userId:userId,
      fromCountry,
      toCountry,
      transactionType,
      amount,
      amountType,
    });

    await newTransaction.save();

    res.status(201).json(newTransaction); // Respond with the newly created transaction
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong. Please try again");
  }
};



export const getTransactions = async (req, res) => {
  try {
    const { userId } = req.user;
    
    const transactions = await Transaction.find({userId:userId});

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong. Please try again");
  }
};

