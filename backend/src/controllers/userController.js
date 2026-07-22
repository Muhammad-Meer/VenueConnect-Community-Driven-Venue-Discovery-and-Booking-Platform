const User = require('../models/User');

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ success: true, user });
};

const updateProfile = async (req, res) => {
  const { name, phone, avatar } = req.body;
  
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, phone, avatar },
    { new: true }
  ).select('-password');

  res.json({ success: true, user });
};

const getAllUsers = async (req, res) => {  // Admin only
  const users = await User.find().select('-password');
  res.json({ success: true, users });
};

module.exports = { getProfile, updateProfile, getAllUsers };