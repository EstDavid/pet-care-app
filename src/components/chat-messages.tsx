'use client';
import { IMessage } from '@/lib/db/models/Message';
import { Card } from '@/components/ui/card';
import { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function ChatMessages({
  messages: initialMessages,
  conversationId,
  dbUser
}: {
  messages: IMessage[];
  conversationId: string;
  dbUser: string;
}) {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);

  // State to store the selected message to view in a modal
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);

  const openMessageModal = (message: IMessage) => {
    setSelectedMessage(message);
  };

  const closeMessageModal = () => {
    setSelectedMessage(null);
  };

  // Scroll to the bottom of the chat when a new message is received
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Connect to the socket server
  useEffect(() => {
    const socket = io('http://localhost:3001');

    // Join the room with conversationId when the component mounts
    socket.emit('join_room', conversationId);

    // Listen for 'receive_msg' event from the server
    socket.on('receive_msg', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup function to disconnect when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col overflow-y-auto">
      {messages &&
        messages.map((message: IMessage, index) => (
          <div
            key={index}
            className={`flex 
            ${
              message.sender?.toString() === dbUser
                ? 'justify-end'
                : 'justify-start'
            } 
            ${index === 0 ? 'mt-[60px]' : ''}`}
            // Open modal when clicking on a message with mediaUrl
            onClick={() => message.mediaUrl && openMessageModal(message)}
          >
            <Card className="px-2 my-2 max-w-[80%] bg-brand-bg-50">
              <div className="flex flex-col justify-between flex-wrap">
                {/* Render image or text message */}
                {message.mediaUrl ? (
                  <img
                    src={message.mediaUrl}
                    alt=""
                    className="max-w-full h-auto max-h-48 rounded-xl mt-2"
                  />
                ) : (
                  <p className="pt-1">{message.textContent}</p>
                )}
                {/* Render date */}
                <p className="text-[0.6rem] text-right text-slate-500 self-end w-full">
                  {new Date(message.createdAt).toLocaleString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </Card>
          </div>
        ))}
      {/* Render modal */}
      {selectedMessage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center"
          onClick={closeMessageModal}
        >
          <div className="bg-brand-fg flex justify-center">
            <img src={selectedMessage.mediaUrl}></img>
          </div>
        </div>
      )}
      {/* Ref to automatically scroll to bottom when opening page or receiving new messages  */}
      <div ref={messagesEndRef} />
    </div>
  );
}
