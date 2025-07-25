import React from 'react'
import useAuthStore from "../store/useAuthStore"
import useChatStore from "../store/useChatStore"
import { X } from 'lucide-react';

const ChatHeader = () => {
    const {onlineUsers}=useAuthStore();
    const {selectedUser,setSelecteduser}=useChatStore();
  return (
    <div className='p-2.5 border-b border-base-300'>
        <div className="flex items-center justify-between">
            <div className='flex gap-3'>
                  {/* Avatar */}
            <div className="avatar">
                <div className="size-10 rounded-full relative">
                    <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName}/>
                </div>
            </div>
            {/* UserInfo */}
            <div><h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className='text-sm text-base-content/70'>{onlineUsers.includes(selectedUser._id)?"Online":"Offline"}</p></div>

            </div>
          
            <button onClick={()=>{setSelecteduser(null)}}><X/>
            </button>
            

        </div>
      
    </div>
  )
}

export default ChatHeader
