"use client";
import React, { useRef, useEffect } from "react";
import { Contact } from "../pages/ChatModulePage";
import Message from "./Message";

interface Props {
  contact: Contact;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: "text" | "payment" | "alert";
  isMe: boolean;
  status: "sent" | "delivered" | "read";
}

const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  "ai-guardian": [
    {
      id: "1",
      senderId: "ai",
      senderName: "AI Guardian",
      content: "Hello! I've been monitoring your recent transactions for any suspicious activity.",
      timestamp: "10:30 AM",
      type: "text",
      isMe: false,
      status: "read",
    },
    {
      id: "2",
      senderId: "ai",
      senderName: "AI Guardian",
      content: "The split request for 'Sushi Dinner' with Sarah Miller looks safe, but I noticed you haven't linked your primary savings account for faster clearance. Would you like to do that now?",
      timestamp: "10:31 AM",
      type: "text",
      isMe: false,
      status: "read",
    },
  ],
  "sarah-miller": [
    {
      id: "3",
      senderId: "me",
      senderName: "Me",
      content: "Hey Sarah, let's split the bill for lunch.",
      timestamp: "Yesterday",
      type: "text",
      isMe: true,
      status: "read",
    },
    {
      id: "4",
      senderId: "sarah",
      senderName: "Sarah Miller",
      content: "Sure! Just sent the split request through the app.",
      timestamp: "Yesterday",
      type: "text",
      isMe: false,
      status: "read",
    },
    {
      id: "5",
      senderId: "sarah",
      senderName: "Sarah Miller",
      content: "Did you see that sushi split I sent?",
      timestamp: "2m ago",
      type: "text",
      isMe: false,
      status: "delivered",
    },
  ],
};

export default function ChatWindow({ contact }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const messages = MOCK_MESSAGES[contact.id] || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [contact.id]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-black/10">
      {/* Window Header */}
      <div className="px-8 py-5 border-b border-white/5 backdrop-blur-md bg-[#050810]/40 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg ${
            contact.isAI ? "bg-gradient-to-br from-[#00C8FF] to-[#0A66C2]" : "bg-white/5 border border-white/10"
          }`}>
             {contact.isAI ? (
               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
             ) : contact.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">{contact.name}</h3>
              {contact.isAI && (
                 <span className="text-[9px] bg-[#00C8FF]/10 text-[#00C8FF] px-1.5 py-0.5 rounded-full border border-[#00C8FF]/20 font-black tracking-tighter uppercase">Verified AI</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${contact.online ? "bg-[#00C851]" : "bg-white/20"}`} />
              <span className="text-[11px] text-white/30 font-medium">
                {contact.online ? "Active Now" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-white/40">
           <button className="p-2.5 rounded-xl hover:bg-white/5 hover:text-white transition-all">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
             </svg>
           </button>
           <button className="p-2.5 rounded-xl hover:bg-white/5 hover:text-white transition-all">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
             </svg>
           </button>
           <button className="p-2.5 rounded-xl hover:bg-white/5 hover:text-white transition-all">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
           </button>
        </div>
      </div>

      {/* Messages area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-8 py-6 space-y-6 custom-scrollbar"
      >
        {messages.map((msg, i) => (
          <Message key={msg.id} message={msg} showAvatar={i === 0 || messages[i-1].senderId !== msg.senderId} />
        ))}
      </div>
    </div>
  );
}
