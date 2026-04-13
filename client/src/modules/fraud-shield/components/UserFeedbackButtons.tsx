"use client";
import React, { useState } from "react";
import { useToast } from "@/hooks/useToast";

export default function UserFeedbackButtons() {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [showText, setShowText] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();

  const handleFeedback = (type: "up" | "down") => {
    setFeedback(type);
    setShowText(true);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setSubmitting(false);
    setSubmitted(true);
    
    toast.success(
      feedback === "up"
        ? "Thank you! Your feedback helps improve our AI."
        : "Thank you! We'll review this false positive."
    );

    // Reset after 3 seconds
    setTimeout(() => {
      setFeedback(null);
      setShowText(false);
      setFeedbackText("");
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div
        className="p-4 rounded-xl text-center"
        style={{
          background: "rgba(0,200,81,0.05)",
          border: "1px solid rgba(0,200,81,0.15)",
        }}
      >
        <div className="text-2xl mb-2">✓</div>
        <div className="text-sm font-bold text-[#00C851]">Feedback Submitted!</div>
        <div className="text-[11px] text-white/40 mt-1">Thank you for helping improve our AI</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Feedback Question */}
      <div className="text-center">
        <div className="text-[11px] font-bold text-white/60 mb-3">Was this block accurate?</div>
        
        {/* Thumbs Up/Down Buttons */}
        <div className="flex gap-3 mb-3">
          <button
            onClick={() => handleFeedback("up")}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              feedback === "up"
                ? "bg-[#00C851]/20 border-[#00C851]/40 text-[#00C851]"
                : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white"
            }`}
            style={{ border: "1px solid" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .715-.211 1.413-.608 2.005L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            Yes, Correct
          </button>
          <button
            onClick={() => handleFeedback("down")}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              feedback === "down"
                ? "bg-[#FF3B5C]/20 border-[#FF3B5C]/40 text-[#FF3B5C]"
                : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white"
            }`}
            style={{ border: "1px solid" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m0 0v9m0-9h2.765a2 2 0 011.789 2.894l-3.5 7A2 2 0 0118.264 15H17m0 0v5m0-5h-2" />
            </svg>
            No, False Positive
          </button>
        </div>
      </div>

      {/* Optional Text Feedback */}
      {showText && (
        <div className="space-y-2">
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Add details (optional)..."
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 resize-none focus:outline-none focus:border-[#8040FF]/50 transition-colors"
            rows={3}
            maxLength={500}
          />
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-white/30">{feedbackText.length}/500 characters</span>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#8040FF] to-[#00C8FF] text-white text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                  Submitting...
                </span>
              ) : (
                "Submit Feedback"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Accuracy Meter */}
      <div
        className="p-3 rounded-lg"
        style={{
          background: "rgba(0,200,81,0.05)",
          border: "1px solid rgba(0,200,81,0.15)",
        }}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] text-white/40">AI Accuracy Rate</span>
          <span className="text-[10px] font-bold text-[#00C851]">97.8%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#00C851]"
            style={{ width: "97.8%" }}
          />
        </div>
        <div className="text-[9px] text-white/30 mt-1">Based on 1,247 user reviews</div>
      </div>
    </div>
  );
}
