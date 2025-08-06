import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const backendBaseURL = 'http://localhost:5000';

export default function MessageInput({ selectedWaId }) {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  async function handleSend() {
    if (!text.trim()) return;

    setSending(true);
    setError(null);

    try {
      const messageId = uuidv4(); // unique message ID
      const timestampISO = new Date().toISOString();

      const newMessage = {
        id: messageId,
        wa_id: selectedWaId,
        text: text.trim(),
        timestamp: timestampISO,
        type: 'text',
      };

      // Send POST request to backend to save message
      await axios.post(`${backendBaseURL}/api/messages`, newMessage);

      // Optionally, you may use a callback prop to update parent message list immediately
      // but here ChatWindow will reload when selectedWaId changes
      
      setText('');
    } catch (err) {
      setError('Failed to send message');
    } finally {
      setSending(false);
    }
  }

  // Allows sending message with Enter key
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sending) handleSend();
    }
  }

  return (
    <div className="border-t border-gray-300 px-4 py-3 bg-white flex items-center space-x-3">
      <textarea
        className="flex-1 resize-none border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type a message"
        value={text}
        rows={1}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={sending}
      />
      <button
        onClick={handleSend}
        disabled={sending || !text.trim()}
        className={`bg-blue-600 text-white rounded-md px-4 py-2 transition-colors disabled:bg-blue-300`}
      >
        {sending ? 'Sending...' : 'Send'}
      </button>
      {error && <div className="text-red-500 text-sm ml-3">{error}</div>}
    </div>
  );
}
