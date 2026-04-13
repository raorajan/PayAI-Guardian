"use client";
import React from "react";

interface Props {
  content: string;
  timestamp: string;
}

export default function UserMessage({ content, timestamp }: Props) {
  return (
    <div className="flex flex-col items-end gap-3 pl-20">
      <div className="px-6 py-4 rounded-3xl bg-white/[0.05] border border-white/10 text-white font-medium text-[15px] leading-relaxed shadow-xl">
        {content}
      </div>
      <div className="px-1 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
        USER_ORIGIN_{timestamp.replace(":", "")}
      </div>
    </div>
  );
}
