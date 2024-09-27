
const Notification = require('../models/notificationModel');

// Send notification to a specific user or broadcast
exports.sendNotification = async (req, res) => {
  const { target, userId, message, source, timestamp } = req.body;
  
  const newNotification = new Notification({
    userId: target === 'all_users' ? null : userId,
    message,
    source,
    timestamp
  });

  try {
    await newNotification.save();
    res.status(200).json({ message: 'Notification sent!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch notifications for a user
exports.getNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({
      $or: [{ userId }, { userId: null }]
    }).sort({ timestamp: -1 });
    
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark notifications as read
exports.markNotificationsAsRead = async (req, res) => {
  const { userId, notificationIds } = req.body;

  try {
    await Notification.updateMany(
      { _id: { $in: notificationIds }, userId },
      { status: 'read' }
    );
    
    res.status(200).json({ message: 'Notifications marked as read!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
        