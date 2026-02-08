"use client";

import { useState } from "react";

export default function TestPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runAnalysis() {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          resumeText,
          jobDescription
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResult(data.analysis);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 900 }}>
      <h2>Resume Analyzer Test</h2>

      <label>Resume</label>
      <textarea
        className = "bg-gray-700"
        rows={6}
        style={{ width: "100%", marginBottom: 10 }}
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <label>Job Description</label>
      <textarea
        className = "bg-gray-700"
        rows={6}
        style={{ width: "100%", marginBottom: 10 }}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button className = "bg-green-500 hover:bg-green-900"onClick={runAnalysis} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>{error}</p>
      )}

      {result && (
        <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
          {result}
        </pre>
      )}
    </div>
  );
}
