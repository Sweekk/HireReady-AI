"use client";

import { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// pdf.js worker served from /public
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

export default function ResumePage() {
  const [promptText, setPromptText] = useState(""); // visible input
  const [pdfText, setPdfText] = useState("");       // hidden extracted text
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  // 🔹 PDF → text (DO NOT inject into prompt)
  async function handlePDFUpload(file) {
    if (!file) return;

    try {
      setError("");
      setPdfText(""); // reset previous PDF text

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
        disableWorker: true
      }).promise;

      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        extractedText += content.items.map(item => item.str).join(" ") + "\n";
      }

      setPdfText(extractedText);
    } catch (err) {
      console.error(err);
      setError("Failed to read PDF");
      setPdfText("");
    }
  }

  // 🔹 Analyze (PDF takes priority)
  async function analyzeResume() {
    const rawText = pdfText || promptText;

    if (!rawText.trim()) {
      setError("Please enter resume text or upload a PDF.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawText
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h1 style={{ fontSize: 22, marginBottom: 12 }}>
        Resume Analyzer
      </h1>

      {/* Prompt header with + upload */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <label>Resume Input</label>
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="bg-gray-600 hover:bg-gray-800 text-white px-3 py-1 rounded"
        >
          +
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        style={{ display: "none" }}
        onChange={(e) => handlePDFUpload(e.target.files[0])}
      />

      {/* Prompt textarea (manual input only) */}
      <textarea
        className="bg-gray-700"
        rows={14}
        style={{ width: "100%", marginTop: 8, marginBottom: 12 }}
        placeholder="Paste your resume text here (optional if you upload a PDF)"
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        disabled={!!pdfText} // optional: lock when PDF is used
      />

      {pdfText && (
        <p style={{ fontSize: 12, color: "#aaa", marginBottom: 8 }}>
          PDF resume loaded. Text is extracted and ready for analysis.
        </p>
      )}

      <button
        className="bg-green-500 hover:bg-green-900 px-4 py-2 rounded"
        onClick={analyzeResume}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 12 }}>{error}</p>
      )}

      {analysis && (
        <pre
          style={{
            marginTop: 20,
            whiteSpace: "pre-wrap",
            background: "#111",
            padding: 16,
            borderRadius: 6
          }}
        >
          {analysis}
        </pre>
      )}
    </div>
  );
}
