/**
 * Webhook Payload Processor Script
 * Reads all .json files from webhook/payloads/ folder and processes messages & statuses
 * Usage: node webhook/processor.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Message = require('../backend/models/Message');

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
  processPayloads();
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const PAYLOADS_DIR = path.join(__dirname, 'payloads');

async function processPayloads() {
  try {
    const files = fs.readdirSync(PAYLOADS_DIR).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(PAYLOADS_DIR, file);
      const jsonRaw = fs.readFileSync(filePath, 'utf-8');
      let payload;
      try {
        payload = JSON.parse(jsonRaw);
      } catch (err) {
        console.error(`Failed to parse JSON in ${file}:`, err);
        continue;
      }

      // Process payload types
      if (payload.messages) {
        // Process each message object
        for (const msg of payload.messages) {
          await processMessagePayload(msg);
        }
      }

      if (payload.statuses) {
        // Process each status update
        for (const status of payload.statuses) {
          await processStatusPayload(status);
        }
      }
    }
  } catch (err) {
    console.error('Error processing payloads:', err);
  } finally {
    console.log('Finished processing payloads');
    mongoose.connection.close();
  }
}

// Process an individual message payload (save new message)
async function processMessagePayload(msg) {
  try {
    const {
      id,
      from: wa_id,
      text,
      timestamp,
      type,
    } = extractMessageFields(msg);

    // Check if the message already exists in DB
    const existing = await Message.findOne({ id });
    if (existing) {
      console.log(`Message ${id} already exists - skipping`);
      return;
    }

    const messageDoc = new Message({
      id,
      wa_id,
      text,
      status: 'sent',
      timestamp: new Date(parseInt(timestamp) * 1000), // timestamp seconds → ms
      type,
    });

    await messageDoc.save();
    console.log(`Saved message ${id}`);
  } catch (err) {
    console.error('Error processing message payload:', err);
  }
}

// Extract required fields safely from the message object
function extractMessageFields(msg) {
  const id = msg.id || msg.message_id || '';
  const wa_id = msg.from || (msg.sender && msg.sender.id) || '';
  let text = '';
  let type = '';

  if (msg.text) {
    text = typeof msg.text === 'string' ? msg.text : msg.text.body || '';
    type = 'text';
  } else if (msg.type) {
    type = msg.type;
    if (msg[msg.type]) {
      if (msg[msg.type].caption) text = msg[msg.type].caption;
      else if (msg[msg.type].url) text = msg[msg.type].url;
      else text = '';
    }
  } else {
    type = 'unknown';
  }

  const timestamp = msg.timestamp || msg.time || '';

  return { id, wa_id, text, timestamp, type };
}

// Process an individual status payload (update existing message status)
async function processStatusPayload(status) {
  try {
    // Sometimes status payload uses 'id', sometimes 'message_id' or 'meta_msg_id'
    const messageId = status.id || status.message_id || status.meta_msg_id;
    if (!messageId) {
      console.warn('Status payload missing message ID - skipping');
      return;
    }

    const newStatus = status.status || status.statuses || '';
    // Validate status value
    const allowedStatuses = ['sent', 'delivered', 'read'];
    if (!allowedStatuses.includes(newStatus)) {
      console.warn(`Invalid status: ${newStatus} for message ${messageId} - skipping`);
      return;
    }

    const updated = await Message.findOneAndUpdate(
      { id: messageId },
      { status: newStatus },
      { new: true }
    );

    if (updated) {
      console.log(`Updated message status for ${messageId} to ${newStatus}`);
    } else {
      console.warn(`Message ID ${messageId} not found in DB to update status`);
    }
  } catch (err) {
    console.error('Error processing status payload:', err);
  }
}
