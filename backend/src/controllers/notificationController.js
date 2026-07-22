const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id })
    .sort({ createdAt: -1 });
  res.json({ success: true, notifications });
};

const markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json({ success: true });
};

module.exports = { getNotifications, markAsRead };