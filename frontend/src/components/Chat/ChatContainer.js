import React, { useState } from 'react'
import ChatList from './ChatList'
import ChatArea from './ChatArea'
import { io } from 'socket.io-client';


function ChatContainer() {
  
  const [currentChat, setCurrentChat] = useState({})

  const socket = io('http://localhost:3232')

  return (
    <div>
        <div className='d-flex'>
          <ChatList setCurrentChat={setCurrentChat}/>
          <ChatArea currentChat={currentChat} socket={socket}/>
        </div>
    </div>
  )
}

export default ChatContainer
