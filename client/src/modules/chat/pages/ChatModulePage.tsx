"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import DashboardHeader from "@/modules/dashboard/components/DashboardHeader";
import ChatHistory from "../components/ChatHistory";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  online: boolean;
  unreadCount: number;
  isAI?: boolean;
}

const INITIAL_CONTACTS: Contact[] = [
  {
    id: "ai-guardian",
    name: "AI Guardian",
    lastMessage: "Shield active. I've analyzed your recent split request with Sarah.",
    time: "Just now",
    online: true,
    unreadCount: 1,
    isAI: true,
  },
  {
    id: "sarah-miller",
    name: "Sarah Miller",
    lastMessage: "Did you see that sushi split I sent?",
    time: "2m ago",
    online: true,
    unreadCount: 2,
  },
  {
    id: "alex-chen",
    name: "Alex Chen",
    lastMessage: "Thanks for the transfer! Everything looks good.",
    time: "1h ago",
    online: false,
    unreadCount: 0,
  },
  {
    id: "jessica-lee",
    name: "Jessica Lee",
    lastMessage: "Check out this restaurant for Friday",
    time: "4h ago",
    online: true,
    unreadCount: 0,
  },
];

export default function ChatPage() {
  const { user, isAuthenticated, loading } = useAppSelector((s) => s.auth);
  const router = useRouter();
  const [selectedContact, setSelectedContact] = useState<Contact>(INITIAL_CONTACTS[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#00C8FF]/20 border-t-[#00C8FF] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="h-screen flex flex-col bg-[#050810] overflow-hidden">
      <DashboardHeader />

      <main className="flex-1 flex relative">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] rounded-full bg-[#00C8FF]/[0.03] blur-[100px]" />
          <div className="absolute bottom-0 left-[-10%] w-[50%] h-[50%] rounded-full bg-[#8040FF]/[0.02] blur-[100px]" />
        </div>

        {/* Conversation List Sidebar */}
        <aside 
          className={`shrink-0 border-r border-white/5 bg-white/[0.01] transition-all duration-300 z-20 ${
            isSidebarOpen ? "w-[350px]" : "w-0 -translate-x-full"
          } lg:relative lg:translate-x-0 absolute inset-y-0 left-0`}
        >
          <ChatHistory 
            contacts={INITIAL_CONTACTS} 
            selectedId={selectedContact.id} 
            onSelect={(c) => {
              setSelectedContact(c);
              // Auto-hide on mobile after selection
              if (window.innerWidth < 1024) setIsSidebarOpen(false);
            }} 
          />
        </aside>

        {/* Chat Area */}
        <section className="flex-1 flex flex-col relative min-w-0 bg-black/20">
          {/* Header Mobile Toggle */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden absolute top-4 left-4 z-30 p-2 rounded-lg bg-white/5 border border-white/10 text-white/70"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          <ChatWindow contact={selectedContact} />
          
          <div className="px-6 pb-6 mt-auto">
            <ChatInput recipientName={selectedContact.name} />
          </div>
        </section>

      </main>
    </div>
  );
}
