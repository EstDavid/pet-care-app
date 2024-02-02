'use client';

import { ChangeEvent, useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

export default function MessageForm() {
  const [textarea, setTextarea] = useState('');

  const handleSubmit = (
    event:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    setTextarea('');
    event.currentTarget.form?.requestSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target && event.target.value) {
      setTextarea(event.target.value);
    }
  };

  return (
    <div>
      <Textarea
        placeholder="Type your message here."
        name="message"
        defaultValue=""
        required
        value={textarea}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit} disabled={textarea === ''}>
        Send message
      </Button>
    </div>
  );
}
