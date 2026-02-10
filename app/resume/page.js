"use client";
import React, { useState, useRef, useEffect } from "react";
import { Plus, SendHorizontal } from "lucide-react";
import { fileHandler } from "@/utils/fileHandler";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef(null);
  const inputRef = useRef(null);

  const canSend = message.trim() || resumeText.trim();

  // Detect whether chat has started
  const hasStarted = analysis || loading || message || resumeText;

  /* ---------- Upload ---------- */
  const handleClick = () => inputRef.current.click();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const text = await fileHandler(file);
      setResumeText(text);
    } catch {
      setAnalysis("Failed to parse resume.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Send ---------- */
  const handleSend = async () => {
    if (!canSend) return;

    setLoading(true);
    setAnalysis("");

    const rawText = `
${resumeText}

User Context:
${message}
`;

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText }),
      });

      const data = await res.json();
      setAnalysis(data.analysis || "No analysis generated.");
      setMessage("");
    } catch {
      setAnalysis("Something went wrong while analyzing.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Auto-grow textarea ---------- */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="flex flex-col h-screen bg-[#0f0f0f] text-white">

      {/* ================= PRE-CHAT BLACK HOLE INTRO ================= */}
      {!hasStarted && (
        <div className="flex flex-1 flex-col items-center justify-center text-center px-6">

          {/* Black Hole */}
          <div className="relative w-56 h-56 mb-10">
            <div className="absolute inset-0 rounded-full bg-black animate-slow-spin shadow-[0_0_100px_30px_rgba(80,80,255,0.25)]" />
            <div className="absolute inset-6 rounded-full bg-[#050505] shadow-inner" />
          </div>

          <h1 className="text-3xl font-semibold tracking-wide">
            Resume Intelligence
          </h1>

          <p className="mt-4 max-w-md text-gray-400 text-sm leading-relaxed">
            Drop your resume into the singularity.
            <br />
            Get deep insights, gaps, and AI-powered improvements.
          </p>

          <p className="mt-8 text-xs text-gray-500">
            Upload a resume or type a role to begin
          </p>
        </div>
      )}

      {/* ================= CHAT UI ================= */}
      {hasStarted && (
        <>
          {/* CHAT AREA */}
          <div className="flex-1 overflow-y-auto px-6 py-10 space-y-6">

            {/* USER MESSAGE */}
            {(message || resumeText) && (
              <div className="flex justify-end">
                <div className="max-w-xl rounded-2xl bg-blue-600 px-5 py-3 text-sm shadow-md">
                  {message || "Resume uploaded"}
                </div>
              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-xl bg-[#1e1e1e] text-gray-400 text-sm animate-pulse">
                  Analyzing resume...
                </div>
              </div>
            )}

            {/* AI RESPONSE */}
            {analysis && (
              <div className="space-y-4">
                {analysis.split("\n\n").map((section, idx) => (
                  <div
                    key={idx}
                    className="max-w-3xl rounded-2xl bg-[#1b1b1b] border border-neutral-800 p-6 shadow-sm"
                  >
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm">
                      {section}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ================= INPUT BAR ================= */}
      <div className="sticky bottom-0 bg-[#0f0f0f] px-4 py-4 border-t border-neutral-800">
        <div className="relative flex items-end max-w-4xl mx-auto bg-[#2a2a2a] rounded-3xl px-3 py-2">

          <input
            type="file"
            accept=".pdf,.docx"
            ref={inputRef}
            onChange={handleChange}
            className="hidden"
          />

          <button
            onClick={handleClick}
            className="p-2 rounded-full hover:bg-neutral-700 transition"
          >
            <Plus size={20} />
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Upload resume or type job role / context..."
            className="flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none"
          />

          <button
            onClick={handleSend}
            disabled={!canSend || loading}
            className={`p-2 rounded-full transition ${
              canSend
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
