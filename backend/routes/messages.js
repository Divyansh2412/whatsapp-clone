
const express = require('express');
const router = express.Router();

const Message = require('../models/Message');

// GET /api/messages/:wa_id - Get all messages for a given WhatsApp ID
router.get('/:wa_id', async (req, res) => {
  try {
    const { wa_id } = req.params;
    const messages = await Message.find({ wa_id }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST /api/messages - Send a new message (store in DB and return saved message)
router.post('/', async (req, res) => {
  try {
    const { id, wa_id, text, timestamp, type } = req.body;

    // Basic validation
    if (!id || !wa_id || !timestamp || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if message ID already exists, avoid duplicate
    let existing = await Message.findOne({ id });
    if (existing) {
      return res.status(409).json({ error: 'Message with this ID already exists' });
    }

    const message = new Message({
      id,
      wa_id,
      text: text || '',
      status: 'sent',
      timestamp: new Date(timestamp),
      type,
    });

    const savedMessage = await message.save();

    // Emit WebSocket event if Socket.IO is enabled
    if (req.app.get('io')) {
      req.app.get('io').emit('newMessage', savedMessage);
    }

    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
