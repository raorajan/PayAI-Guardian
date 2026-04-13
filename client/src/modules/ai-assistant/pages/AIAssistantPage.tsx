"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import DashboardHeader from "@/modules/dashboard/components/DashboardHeader";
import ChatInterface from "../components/ChatInterface";
import ReasoningChain from "../components/ReasoningChain";
import MarketDataWidget from "../components/MarketDataWidget";
import { AssistantMessage } from "../slice/aiAssistantSlice";

const MOCK_MESSAGES: AssistantMessage[] = [
  {
    id: "1",
    role: "assistant",
    content: "Commander, I am operational. I'm currently running a deep scan of your last 24 hours of transaction volume. No anomalies detected yet.",
    timestamp: "17:34",
    type: "text",
  },
  {
    id: "2",
    role: "user",
    content: "Can you analyze my risk exposure for the upcoming international trip?",
    timestamp: "17:35",
    type: "text",
  },
  {
    id: "3",
    role: "assistant",
    content: "Initiating Global Risk Protocol for 'United Kingdom'. Scanning for local phishing trends and ATM skimming reports in your destination area.",
    timestamp: "17:35",
    type: "text",
    reasoningSteps: [
      "Geolocation query: London, UK",
      "Fetching recent fraud datasets from Interpol-X",
      "Analyzing user spending history in GBP currency",
      "Evaluating device fingerprinting for international roaming"
    ]
  }
];

export default function AIAssistantPage() {
  const { user, isAuthenticated, loading } = useAppSelector((s) => s.auth);
  const router = useRouter();
  const [activeReasoning, setActiveReasoning] = useState<string[]>([]);
  const [messages, setMessages] = useState<AssistantMessage[]>(MOCK_MESSAGES);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    // Show reasoning for the latest message if it exists
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.reasoningSteps) {
      setActiveReasoning(lastMsg.reasoningSteps);
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#00C8FF]/20 border-t-[#00C8FF] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="h-screen flex flex-col bg-[#020408] text-white selection:bg-[#00C8FF]/30 overflow-hidden">
      <DashboardHeader />

      <main className="flex-1 flex relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-[#00C8FF]/[0.02] blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-[40%] h-[40%] rounded-full bg-[#00C851]/[0.01] blur-[150px]" />
        </div>

        {/* Central Command Thread */}
        <section className="flex-1 flex flex-col relative z-10 border-r border-white/5">
           <ChatInterface 
             messages={messages} 
             onSendMessage={(content) => {
               const newMsg: AssistantMessage = {
                 id: Date.now().toString(),
                 role: "user",
                 content,
                 timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                 type: "text"
               };
               setMessages([...messages, newMsg]);
             }}
           />
        </section>

        {/* Intelligence Sidebar */}
        <aside className="w-[420px] shrink-0 bg-black/40 backdrop-blur-3xl p-8 flex flex-col gap-8 overflow-y-auto hidden xl:flex relative z-10">
           <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#00C8FF]/10 flex items-center justify-center text-[#00C8FF]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-black tracking-tight uppercase">Intelligence Feed</h2>
           </div>

           <ReasoningChain steps={activeReasoning} />
           
           <div className="border-t border-white/5 pt-8">
              <MarketDataWidget />
           </div>

           {/* Security Status Card */}
           <div className="mt-auto p-6 rounded-2xl bg-gradient-to-br from-[#00C851]/10 to-transparent border border-[#00C851]/20">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 rounded-full bg-[#00C851] anim-pulse-glow" />
                 <span className="text-[10px] font-black text-[#00C851] tracking-[0.2em] uppercase">Guardian Online</span>
              </div>
              <p className="text-[12px] text-white/50 leading-relaxed">
                All external API calls and market queries are proxied through the AI Guardian Secure Node.
              </p>
           </div>
        </aside>

      </main>
    </div>
  );
}
