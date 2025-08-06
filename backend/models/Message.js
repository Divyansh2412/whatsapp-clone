const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Unique message ID from the payload
  wa_id: { type: String, required: true }, // WhatsApp number ID (sender or receiver)
  text: { type: String, default: '' }, // Message text content
  status: { 
    type: String, 
    enum: ['sent', 'delivered', 'read'],
    default: 'sent',
  },
  timestamp: { type: Date, required: true }, // ISO Date of the message timestamp
  type: { type: String, required: true }, // text/image/audio/etc.
}, {
  timestamps: true,
});

module.exports = mongoose.model('Message', MessageSchema);
