import userModel from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, department } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser =  await userModel.create({ name, email, department });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
