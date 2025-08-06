import React, { useState, useEffect } from 'react';
import ChatSidebar from './components/ChatSidebar';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

export default function App() {
  const [selectedWaId, setSelectedWaId] = useState(null);
  const [lastMessageEvent, setLastMessageEvent] = useState(null);

  // Example: You would setLastMessageEvent based on WebSocket or polling messages

  return (
    <div className="flex h-screen bg-[#ece5dd]">
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="bg-[#075E54] text-white px-5 py-4 text-xl font-semibold flex-shrink-0">
          WhatsApp Clone
        </div>
        <ChatSidebar selectedWaId={selectedWaId} onSelectWaId={setSelectedWaId} />
      </aside>

      <main className="flex-1 flex flex-col">
        {selectedWaId ? (
          <>
            <ChatWindow selectedWaId={selectedWaId} newMessageEvent={lastMessageEvent} />
            <MessageInput selectedWaId={selectedWaId} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 select-none">
            Select a chat to start messaging
          </div>
        )}
      </main>
    </div>
  );
}
