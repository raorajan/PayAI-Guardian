"use client";
import React from "react";
import { ChatMessage } from "./ChatWindow";

interface Props {
  message: ChatMessage;
  showAvatar: boolean;
}

export default function Message({ message, showAvatar }: Props) {
  const isAI = message.senderId === "ai";
  const isMe = message.isMe;

  return (
    <div className={`flex items-end gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar Slot */}
      <div className="w-8 shrink-0">
        {showAvatar && !isMe && (
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg ${
            isAI ? "bg-gradient-to-br from-[#00C8FF] to-[#0A66C2]" : "bg-white/10 border border-white/5"
          }`}>
             {isAI ? (
               <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
             ) : message.senderName.charAt(0)}
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className={`max-w-[70%] space-y-1 ${isMe ? "items-end" : "items-start"}`}>
        <div 
          className={`px-4 py-3 rounded-2xl text-[14px] leading-[1.6] relative shadow-lg ${
            isMe 
              ? "bg-[#0A66C2] text-white rounded-br-none" 
              : isAI 
                ? "bg-white/5 border border-[#00C8FF]/20 text-[#00C8FF] backdrop-blur-md rounded-bl-none shadow-[0_0_20px_rgba(0,100,220,0.15)]" 
                : "bg-white/5 border border-white/10 text-white/90 rounded-bl-none"
          }`}
        >
          {message.content}

          {/* Timestamp overlay (optional design choice) */}
          <div className={`mt-1.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest ${
            isMe ? "text-white/50" : isAI ? "text-[#00C8FF]/50" : "text-white/30"
          }`}>
            {message.timestamp}
            {isMe && (
               <svg className={`w-3 h-3 ${message.status === "read" ? "text-blue-400" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
               </svg>
            )}
          </div>
        </div>
        
        {isAI && (
          <div className="flex items-center gap-2 mt-2 px-1">
             <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] anim-pulse-glow" />
             <span className="text-[10px] font-bold text-[#00C8FF]/70 tracking-tighter uppercase cursor-pointer hover:underline">Verify transaction safety</span>
          </div>
        )}
      </div>
    </div>
  );
}
