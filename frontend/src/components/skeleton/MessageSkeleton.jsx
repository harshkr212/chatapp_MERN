import React from 'react'

const MessageSkeleton = () => {
    const skeletonMessage = Array(6).fill(null);
    return (
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {skeletonMessage.map((_, idx) => (
                <div className={`chat ${idx % 2 == 0 ? "chat-start" : "chat-end"}`}
                    key={idx}
                >
                <div className="chat-image avatar">
                    <div className="size-10 rounded-full">
                        <div className="skeleton w-full h-full rounded-full"></div>
                    </div>
                </div>
                <div className="chat-header mb-1">
                    <div className="skeleton h-4 w-16"></div>
                </div>

                <div className="chat-bubble bg-transparent p-0">
                    <div className="skeleton h-16 w-[200px]"></div>
                </div>
                </div>
            ))}

        </div>
    )
}

export default MessageSkeleton
