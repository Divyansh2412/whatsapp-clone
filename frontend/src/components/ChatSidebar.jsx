import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ChatSidebar({ selectedWaId, onSelectWaId }) {
  const [chatUsers, setChatUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch unique wa_id list from backend by getting all messages and extracting wa_ids
  // Since backend does not have an API to list all wa_ids, we implement a workaround:
  // We fetch messages for a hardcoded common wa_id or you can send an API request to get unique IDs if backend supports it.
  // Here, we fetch all messages by wa_id = all using the backend and extract unique IDs.
  // For simplicity, let's simulate fetching wa_ids by calling backend with a big sample or you can extend backend later.
  
  // As workaround: We will fetch from a backend endpoint that returns a static list or create it here. 
  // But since backend doesn't support it, we'll mock some IDs here.

  // Instead, we simulate fetching wa_ids by fetching from the backend all user messages for some example ID or mock.
  // You will likely extend backend to add this feature.

  // For demo, we will load some static wa_id list for now.

  useEffect(() => {
    async function fetchWaIds() {
      setLoading(true);
      setError(null);
      try {
        // Ideally, backend API like: GET /api/users or GET /api/wa_ids
        // But since not implemented yet, static data:
        // TODO: Replace this with actual API once backend supports listing users
        const exampleUsers = [
          '1234567890',
          '9876543210',
          '5551234567',
          '1112223333'
        ];
        setChatUsers(exampleUsers);
      } catch (err) {
        setError('Failed to load chat users');
      } finally {
        setLoading(false);
      }
    }
    fetchWaIds();
  }, []);

  return (
    <nav className="flex-1 overflow-y-auto bg-gray-50">
      {loading && (
        <div className="p-4 text-center text-gray-500">
          Loading chats...
        </div>
      )}
      {error && (
        <div className="p-4 text-center text-red-500">
          {error}
        </div>
      )}
      {!loading && !error && chatUsers.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          No chats found
        </div>
      )}
      <ul>
        {chatUsers.map((wa_id) => (
          <li
            key={wa_id}
            onClick={() => onSelectWaId(wa_id)}
            className={`cursor-pointer px-4 py-3 border-b border-gray-200 hover:bg-gray-100 ${
              wa_id === selectedWaId ? 'bg-white font-semibold' : ''
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if(e.key === 'Enter') onSelectWaId(wa_id)}}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white font-bold uppercase">
                {wa_id.slice(-2)}
              </div>
              <span className="truncate">{wa_id}</span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
