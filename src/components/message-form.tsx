'use client';

import { ChangeEvent, useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import io from 'socket.io-client';
import UploadWidget from '@/components/upload-widget';
import { postImage } from '@/lib/actions/chat-actions';

// Connect to the socket server
var socket: any;
socket = io('http://localhost:3001');

export default function MessageForm({
  conversationId,
  dbUser,
}: {
  conversationId: string;
  dbUser: string;
}) {
  const [textarea, setTextarea] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');

  // Send image to socket server and post it to the database
  const handleImageUpload = (result: string) => {
    setMediaUrl(result);
    const newMessage = {
      textContent: '',
      createdAt: new Date().toISOString(),
      sender: dbUser,
      mediaUrl: result,
    };
    socket.emit('send_msg', newMessage, conversationId);
    postImage(conversationId, dbUser, result);
    setMediaUrl('');
  };

  // Send message to socket server post it to the database
  const handleSubmit = (
    event:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    const newMessage = {
      textContent: textarea,
      createdAt: new Date().toISOString(),
      sender: dbUser,
    };
    socket.emit('send_msg', newMessage, conversationId);
    setTextarea('');
    event.currentTarget.form?.requestSubmit();
  };

  // Send message when the user presses the Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // TODO not possible to delete last character
    if (event.target && event.target.value) {
      setTextarea(event.target.value);
    }
  };

  return (
    <div>
      <Textarea
        placeholder="Type your message here."
        name="message"
        required
        value={textarea}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className="bg-white"
      />
      <Button onClick={handleSubmit} disabled={textarea === ''}>
        Send message
      </Button>
      <UploadWidget onUploadedSuccess={handleImageUpload} />
    </div>
  );
}
