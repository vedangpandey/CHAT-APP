import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
const Message = ({message}) => {
  
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
  console.log(message.senderId);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  // st=message.message;
  return (
      <div className= {`chat ${chatClassName}`} >
      <div className="chat-image avatar">
        < div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
  </div>
  <div className={`chat-bubble text-white  pb-2 ${bubbleBgColor}`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{message.createdAt}</div>
  </div>
  )
};

export default Message