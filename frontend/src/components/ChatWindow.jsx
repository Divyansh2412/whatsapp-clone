import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const backendBaseURL = "http://localhost:5000";

function formatTimestamp(ts) {
  const date = new Date(ts);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatWindow({ selectedWaId, newMessageEvent }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  async function fetchMessages() {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${backendBaseURL}/api/messages/${selectedWaId}`);
      const sortedMsgs = res.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setMessages(sortedMsgs);
    } catch (err) {
      setError("Failed to fetch messages");
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  }

  useEffect(() => {
    if (selectedWaId) {
      fetchMessages();
    } else {
      setMessages([]); // Clear messages if no chat selected
    }
  }, [selectedWaId]);

  useEffect(() => {
    if (newMessageEvent && newMessageEvent.wa_id === selectedWaId) {
      fetchMessages();
    }
  }, [newMessageEvent]);

  function scrollToBottom() {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-[url('https://i.imgur.com/9EUh2Kx.png')] bg-repeat">
      {loading && (
        <div className="text-center text-gray-400 mb-2">Loading messages...</div>
      )}
      {error && (
        <div className="text-center text-red-500 mb-2">{error}</div>
      )}
      {!loading && messages.length === 0 && (
        <div className="text-center text-gray-400 mt-20 select-none">
          No messages yet. Start the conversation!
        </div>
      )}
      <div className="flex flex-col space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-4 py-2 rounded-lg shadow ${
              msg.fromSelf
                ? "bg-[#dcf8c6] self-end"
                : "bg-white self-start"
            }`}
          >
            <div className="whitespace-pre-wrap">{msg.message}</div>
            <div className="text-xs text-gray-500 mt-1 text-right">
              {formatTimestamp(msg.timestamp)}
            </div>
          </div>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
