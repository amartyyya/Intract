
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: false }, // Null for broadcast
  message: { type: String, required: true },
  source: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: 'unread' }
});

module.exports = mongoose.model('Notification', notificationSchema);
        