
const Notification = require('../models/notificationModel');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New user connected');

    // Listen for notification events and broadcast to users
    socket.on('send_notification', async (data) => {
      const { target, userId, message, source, timestamp } = data;
      
      const newNotification = new Notification({
        userId: target === 'all_users' ? null : userId,
        message,
        source,
        timestamp
      });

      await newNotification.save();

      if (target === 'all_users') {
        io.emit('receive_notification', newNotification); // Broadcast to all
      } else {
        socket.to(userId).emit('receive_notification', newNotification); // Specific user
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
        