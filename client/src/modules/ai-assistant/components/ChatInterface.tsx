"use client";
import React, { useRef, useEffect, useState } from "react";
import { AssistantMessage } from "../slice/aiAssistantSlice";
import UserMessage from "./UserMessage";
import AIMessage from "./AIMessage";
import TransactionApprovalCard from "./TransactionApprovalCard";
import SuggestedActions from "./SuggestedActions";

interface Props {
  messages: AssistantMessage[];
  onSendMessage: (content: string) => void;
}

export default function ChatInterface({ messages, onSendMessage }: Props) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Thread Container */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-8 py-10 space-y-10 custom-scrollbar"
      >
        <div className="max-w-[800px] mx-auto space-y-10">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "user" ? (
                <UserMessage content={msg.content} timestamp={msg.timestamp} />
              ) : (
                <div className="space-y-6">
                  <AIMessage content={msg.content} timestamp={msg.timestamp} />
                  {msg.type === "approval" && <TransactionApprovalCard data={msg.data} />}
                  <SuggestedActions />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Command Input */}
      <div className="p-8 bg-gradient-to-t from-[#020408] to-transparent">
        <form 
          onSubmit={handleSubmit}
          className="max-w-[800px] mx-auto relative group"
        >
          <div className="absolute inset-0 bg-[#00C8FF]/5 rounded-2xl blur-xl group-focus-within:bg-[#00C8FF]/10 transition-all opacity-0 group-focus-within:opacity-100" />
          
          <div className="relative flex items-end gap-3 p-2 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-3xl focus-within:border-[#00C8FF]/50 transition-all shadow-2xl">
             <button type="button" className="p-3 mb-1 rounded-xl hover:bg-white/5 text-white/30 hover:text-[#00C8FF] transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
             </button>

             <textarea
               rows={1}
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Run a command or ask the Guardian..."
               className="flex-1 bg-transparent border-none focus:ring-0 text-white text-[15px] py-3.5 px-2 resize-none no-scrollbar placeholder:text-white/20 h-auto"
               style={{ maxHeight: "200px" }}
               onInput={(e) => {
                 const target = e.target as HTMLTextAreaElement;
                 target.style.height = "auto";
                 target.style.height = `${target.scrollHeight}px`;
               }}
               onKeyDown={(e) => {
                 if (e.key === "Enter" && !e.shiftKey) {
                   e.preventDefault();
                   handleSubmit(e);
                 }
               }}
             />

             <button 
               type="submit"
               disabled={!input.trim()}
               className={`p-3.5 mb-1 rounded-xl transition-all ${
                 input.trim() 
                   ? "bg-[#00C8FF] text-[#020408] shadow-[0_0_20px_rgba(0,200,255,0.4)] hover:scale-105" 
                   : "bg-white/5 text-white/10 cursor-not-allowed"
               }`}
             >
                <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
             </button>
          </div>
          
          {/* Helper UI */}
          <div className="flex items-center justify-center gap-6 mt-4 opacity-30">
             <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold">
                <span className="px-1.5 py-0.5 rounded-md bg-white/10">ESC</span>
                <span>to cancel</span>
             </div>
             <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold">
                <span className="px-1.5 py-0.5 rounded-md bg-white/10">TAB</span>
                <span>for autocomplete</span>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
}
