"use client";
import React, { useState, useRef, useEffect } from "react";
import { Plus, SendHorizontal } from "lucide-react";
import { fileHandler } from "@/utils/resumeParser";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef(null);
  const inputRef = useRef(null);

  const canSend =
    message.trim().length > 0 || resumeText.trim().length > 0;

  /* ---------- Upload ---------- */
  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const text = await fileHandler(file);
      setResumeText(text);
    }
  };

  /* ---------- Send / Analyze ---------- */
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
        body: JSON.stringify({ rawText })
      });

      const data = await res.json();
      setAnalysis(data.analysis || "No analysis generated.");
    } catch (err) {
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
    <div className="flex flex-col items-center w-full min-h-screen p-6 bg-[#171717]">

      {/* INPUT BAR */}
      <div className="relative flex items-end w-full max-w-3xl p-2 bg-[#2f2f2f] rounded-[28px]">
        <input
          type="file"
          accept=".pdf,.docx"
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
        />

        <button
          onClick={handleClick}
          className="p-2 mb-1 ml-1 rounded-full hover:bg-neutral-600"
        >
          <Plus size={20} className="text-white" />
        </button>

        <textarea
          ref={textareaRef}
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Upload resume or type job role / context..."
          className="w-full py-3 ml-2 mr-2 text-white bg-transparent resize-none outline-none"
        />

        {/* SEND BUTTON (FIXED) */}
        <button
          onClick={handleSend}
          disabled={!canSend || loading}
          className={`p-2 mb-1 mr-1 rounded-full transition
            ${canSend ? "bg-white hover:bg-gray-200" : "bg-gray-600 cursor-not-allowed"}
          `}
        >
          <SendHorizontal size={18} className="text-black" />
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="mt-6 text-gray-400">
          Analyzing resume...
        </div>
      )}

      {/* ANALYSIS RESULT */}
      {analysis && (
        <div className="w-full max-w-3xl mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Resume Analysis
          </h2>

          {analysis.split("\n\n").map((section, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#1e1e1e] border border-neutral-700 rounded-xl"
            >
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {section}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
