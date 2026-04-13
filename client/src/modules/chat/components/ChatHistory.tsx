"use client";
import React, { useState } from "react";
import { Contact } from "../pages/ChatModulePage";

interface Props {
  contacts: Contact[];
  selectedId: string;
  onSelect: (contact: Contact) => void;
}

export default function ChatHistory({ contacts, selectedId, onSelect }: Props) {
  const [search, setSearch] = useState("");

  const filtered = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#080C1E]/50 backdrop-blur-xl">
      {/* Sidebar Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-extrabold text-white tracking-tight">Messages</h2>
          <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#00C8FF] hover:bg-[#00C8FF]/10 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm focus:border-[#00C8FF]/50 focus:bg-white/10 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto px-3 pb-6 custom-scrollbar">
        <div className="space-y-1">
          {filtered.map((contact) => (
            <button
              key={contact.id}
              onClick={() => onSelect(contact)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all relative group ${
                selectedId === contact.id ? "bg-[#0A66C2]/15 shadow-xl" : "hover:bg-white/5"
              }`}
            >
              {/* Active Stripe */}
              {selectedId === contact.id && (
                <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#00C8FF] rounded-r-full shadow-[0_0_12px_rgba(0,200,255,1)]" />
              )}

              {/* Avatar */}
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg transition-transform group-hover:scale-105 ${
                  contact.isAI 
                    ? "bg-gradient-to-br from-[#00C8FF] to-[#0A66C2]" 
                    : "bg-white/10 border border-white/10"
                }`}>
                  {contact.isAI ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    contact.name.charAt(0)
                  )}
                </div>
                {contact.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#00C851] rounded-full border-2 border-[#080C1E] shadow-[0_0_8px_rgba(0,200,81,0.6)]" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex justify-between items-center mb-0.5">
                  <span className={`text-[15px] font-bold truncate ${selectedId === contact.id ? "text-[#00C8FF]" : "text-white/80"}`}>
                    {contact.name}
                  </span>
                  <span className="text-[10px] text-white/30 font-medium whitespace-nowrap ml-2 uppercase">
                    {contact.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[12px] text-white/40 truncate leading-relaxed">
                    {contact.lastMessage}
                  </p>
                  {contact.unreadCount > 0 && (
                    <span className="ml-2 flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-[#00C8FF] text-white text-[10px] font-black px-1.5 shadow-[0_4px_10px_rgba(0,200,255,0.4)]">
                      {contact.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Pro Help Banner */}
      <div className="p-6 border-t border-white/5 bg-gradient-to-t from-[#00C8FF]/[0.02] to-transparent">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00C8FF]/10 flex items-center justify-center text-[#00C8FF]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-[11px] text-white/40 leading-snug">
            All chats are analyzed by the <span className="text-[#00C8FF] font-bold">AI Guardian</span> to prevent phishing attempts.
          </p>
        </div>
      </div>
    </div>
  );
}
