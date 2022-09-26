const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!req?.body?.id)
    return res.status(400).json({ message: "No users found" });
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.find({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User Id ${req.params.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ mesaage: `User ID ${req.params.id} not found` });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
};
