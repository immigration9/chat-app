import React from 'react';
import { ChatMessageOutline, ChatBalloonRight, ChatBalloonLeft } from './ChatMessageStyles';

const ChatMessage = ({ isOwner, text, type }) => {
  const ChatBalloon = isOwner ? ChatBalloonRight : ChatBalloonLeft;
  return (
    <ChatMessageOutline isOwner={isOwner}>
      <ChatBalloon>
        {text}
      </ChatBalloon>
    </ChatMessageOutline>
  )
}

export default ChatMessage;