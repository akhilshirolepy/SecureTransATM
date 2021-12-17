import Account from "../models/account.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
export const getAccountDetails = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const account = await Account.findOne({ userId: userId });
  if (!account) {
    res.status(404);
    throw new Error("Error: Account Not Found");
  }
  return res.json(account);
});

export const createAccountRequest = asyncHandler(async (req, res) => {
  const { name, email, aadharNumber, PIN } = req.body;
  const account = await Account.create({
    userId: req.user._id,
    name,
    email,
    aadharNumber,
    status: "pending",
    PIN,
  });
  if (!account) {
    res.status(404);
    throw new Error("Error: Account not Created");
  }
  return res.json(account);
});

export const approveCreateAccountRequest = asyncHandler(async (req, res) => {
  const account = await Account.findById({ _id: req.params.id });
  if (!account) {
    res.status(404);
    throw new Error("Error: Account not Found");
  }
  account.status = "active";
  account.accountNumber = new Date().valueOf();
  const updatedAccount = await account.save();
  const accountUser = await User.findById({ _id: req.body.userId });
  accountUser.accountCreated = "true";
  const updatedAccountUser = await accountUser.save();
  return res.json(updatedAccount);
});
