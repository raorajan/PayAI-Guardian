"use client";
import React, { useState } from "react";

interface Recipient {
  id: string;
  name: string;
  email: string;
  avatar: string;
  trustScore: number;
  lastSent: string;
  verified: boolean;
}

const RECIPIENTS: Recipient[] = [
  { id: "r1", name: "Sarah Miller",   email: "sarah.m@email.com",   avatar: "SM", trustScore: 98, lastSent: "2 days ago",  verified: true  },
  { id: "r2", name: "James Okafor",   email: "james.o@email.com",   avatar: "JO", trustScore: 95, lastSent: "1 week ago",  verified: true  },
  { id: "r3", name: "Priya Kapoor",   email: "priya.k@email.com",   avatar: "PK", trustScore: 92, lastSent: "3 weeks ago", verified: true  },
  { id: "r4", name: "Marco Rossi",    email: "marco.r@email.com",   avatar: "MR", trustScore: 78, lastSent: "1 month ago", verified: false },
  { id: "r5", name: "Liu Wei",        email: "liu.w@email.com",     avatar: "LW", trustScore: 89, lastSent: "2 months ago",verified: true  },
];

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#0A66C2,#00C8FF)",
  "linear-gradient(135deg,#8040FF,#4060FF)",
  "linear-gradient(135deg,#00C851,#00C8FF)",
  "linear-gradient(135deg,#FF3B5C,#8040FF)",
  "linear-gradient(135deg,#FFA500,#FF3B5C)",
];

interface Props {
  onSelect?: (name: string) => void;
}

export default function RecipientSearch({ onSelect }: Props) {
  const [query, setQuery]       = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const results = query.length > 0
    ? RECIPIENTS.filter(r =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.email.toLowerCase().includes(query.toLowerCase())
      )
    : RECIPIENTS;

  const handleSelect = (r: Recipient) => {
    setSelected(r.id);
    setQuery(r.name);
    onSelect?.(r.name);
  };

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,200,255,0.1)" }}>
          <svg className="w-4 h-4 text-[#00C8FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-white">Send to Someone</h2>
      </div>

      {/* Search Input */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,200,255,0.15)" }}
      >
        <svg className="w-4 h-4 text-white/30 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name or email…"
          className="flex-1 bg-transparent text-[13px] text-white/85 outline-none placeholder:text-white/25"
        />
        {query && (
          <button onClick={() => { setQuery(""); setSelected(null); }} className="text-white/30 hover:text-white transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Frequent contacts label */}
      <div className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-3">
        {query ? "Search results" : "Frequent contacts"}
      </div>

      {/* Recipients */}
      <div className="flex flex-col gap-2">
        {results.length === 0 ? (
          <div className="py-8 flex flex-col items-center gap-2 text-white/30">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm">No contacts found</span>
          </div>
        ) : (
          results.map((r, i) => {
            const isSelected = selected === r.id;
            return (
              <button
                key={r.id}
                onClick={() => handleSelect(r)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all hover:scale-[1.01]"
                style={{
                  background: isSelected ? "rgba(0,200,255,0.07)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isSelected ? "rgba(0,200,255,0.25)" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] }}
                >
                  {r.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-semibold text-white/90 truncate">{r.name}</span>
                    {r.verified && (
                      <svg className="w-3 h-3 text-[#00C8FF] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="text-[11px] text-white/35 truncate">{r.email} · {r.lastSent}</div>
                </div>

                {/* Trust score */}
                <div className="shrink-0 flex flex-col items-end gap-1">
                  <div
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      color:      r.trustScore >= 90 ? "#00C851" : r.trustScore >= 75 ? "#FFA500" : "#FF3B5C",
                      background: r.trustScore >= 90 ? "rgba(0,200,81,0.1)" : r.trustScore >= 75 ? "rgba(255,165,0,0.1)" : "rgba(255,59,92,0.1)",
                    }}
                  >
                    {r.trustScore}% trust
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#00C8FF" }}>
                      <svg className="w-2.5 h-2.5" fill="white" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Add new contact button */}
      <button
        className="w-full mt-4 py-2.5 rounded-xl text-[13px] text-white/40 hover:text-[#00C8FF] transition-all flex items-center justify-center gap-2"
        style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        Add new recipient
      </button>
    </div>
  );
}
