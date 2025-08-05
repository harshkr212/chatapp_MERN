import { Image, Send, SendHorizonal, X } from 'lucide-react'
import React, { useState,useRef } from 'react'
import toast from 'react-hot-toast';
import useChatStore from '../store/useChatStore'

const MessageInput = () => {
  const [imagePreview,setImagePreview]=useState(null);
  const {sendMessage}=useChatStore();
  const [text,setText]=useState("")
  const handleImageChange=(e)=>{
    const file=e.target.files[0];
    if(!file){
      toast.error("Please select image file");
      return;
    }
    const reader=new FileReader();
    reader.onloadend=()=>{
      setImagePreview(reader.result);
    }
    reader.readAsDataURL(file);
  }
  const removeImage=()=>{
    setImagePreview(null);
    if(fileInputRef.current){fileInputRef.current.value=""}
  }
  const handleSendMessage=async(e)=>{
    e.preventDefault();
    if(!text.trim() && !imagePreview) return;
    try{
      await sendMessage({
        text:text.trim(),
        image:imagePreview
      })
      setImagePreview(null);
      setText("");
       if(fileInputRef.current){fileInputRef.current.value=""}
    } catch(error){
   toast.error("Failed to send a message");
    }

  }
  const fileInputRef=useRef(null)
  return (
    <div className='p-4 w-full'>
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
            src={imagePreview}
            alt="Preview"
            className='size-20 object-cover rounded-lg border border-zinc-700'
            />
            <button
            onClick={removeImage}
            className='absolute pt-1.5 pr-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center'
            >
              <X className='size-3'/>

            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <input
        type="text"
        className='w-full input input-bordered rounded-lg input-sm sm:input-md'
        placeholder='Type a message...'
        value={text}
        onChange={(e)=>{setText(e.target.value)}}
        />
        <input
        type="file"
        className='hidden'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleImageChange}
        />
        <button className={`hidden sm:flex btn btn-circle ${imagePreview?"text-emerald-500":"text-zinc-500"}`}
        onClick={()=>{fileInputRef.current?.click()}}>
          <Image className='size-20' />

        </button>
        <button type="submit" disabled={text==="" && !imagePreview} className={` ${(text==="" && !imagePreview)?"text-zinc-700":"text-zinc-400"}`}><SendHorizonal className='size-8'/></button>
      </form>
    </div>
  )
}

export default MessageInput
