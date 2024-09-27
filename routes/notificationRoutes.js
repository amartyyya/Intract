
const express = require('express');
const router = express.Router();
const {
  sendNotification,
  getNotifications,
  markNotificationsAsRead
} = require('../controllers/notificationController');

router.post('/send', sendNotification);
router.get('/:userId', getNotifications);
router.post('/read', markNotificationsAsRead);

module.exports = router;
        