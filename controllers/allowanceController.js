import allowanceModel from "../models/AllowanceRequest.js";
import User from "../models/User.js";
import sendMail from "../services/nodemailer.js";


export const createRequest = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const request = await allowanceModel.create({ user: userId, amount, description });

    await sendMail({
      employeeName: user.name,
      amount: amount,
      description: description,
      date: request.date
    });

    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getRequests = async (req, res) => {
  try {
    const requests = await allowanceModel.find().populate("user");
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await allowanceModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await allowanceModel.findByIdAndDelete(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
