"use client";

import { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

export default function InterviewTestPage() {
  const [resumeText, setResumeText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  /* ---------------- PDF UPLOAD ---------------- */
  async function handlePDFUpload(file) {
    if (!file) return;

    try {
      setError("");
      const arrayBuffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
        disableWorker: true
      }).promise;

      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(" ") + "\n";
      }

      setResumeText(text);
    } catch {
      setError("Failed to read PDF");
    }
  }

  /* ---------------- GENERATE QUESTIONS ---------------- */
  async function generateQuestions() {
    if (!resumeText.trim()) {
      setError("Please paste resume text or upload a PDF.");
      return;
    }

    setLoading(true);
    setError("");
    setQuestions([]);
    setAnswers({});
    setEvaluations({});
    setInterviewStarted(false);

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: resumeText })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const extractedQuestions = data.questions
        .split("\n")
        .map(q => q.trim())
        .filter(q => q.endsWith("?"));

      setQuestions(extractedQuestions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- EVALUATE ANSWER ---------------- */
  async function evaluateAnswer(index) {
    const question = questions[index];
    const answer = answers[index];

    if (!answer || !answer.trim()) return;

    const res = await fetch("/api/interview/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer })
    });

    const data = await res.json();

    setEvaluations(prev => ({
      ...prev,
      [index]: data.evaluation
    }));
  }

  /* ---------------- UI ---------------- */
  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>
        Mock Interview Test
      </h1>

      {/* Resume Input */}
      <textarea
        rows={6}
        placeholder="Paste resume text here or upload a PDF"
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        className="bg-gray-700 w-full"
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={() => fileInputRef.current.click()}>
          Upload Resume PDF
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={(e) => handlePDFUpload(e.target.files[0])}
        />
      </div>

      {/* Generate Questions */}
      <div style={{ marginTop: 16 }}>
        <button onClick={generateQuestions} disabled={loading}>
          {loading ? "Generating..." : "Generate Interview Questions"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Start Interview Button */}
      {questions.length > 0 && !interviewStarted && (
        <div style={{ marginTop: 20 }}>
          <p>{questions.length} questions ready.</p>
          <button onClick={() => setInterviewStarted(true)}>
            Start Interview
          </button>
        </div>
      )}

      {/* Interview Q&A */}
      {interviewStarted && questions.map((q, i) => (
        <div
          key={i}
          style={{
            marginTop: 24,
            padding: 12,
            background: "#111",
            borderRadius: 6
          }}
        >
          <strong>Q{i + 1}: {q}</strong>

          <textarea
            rows={4}
            placeholder="Your answer"
            className="bg-gray-800 w-full"
            value={answers[i] || ""}
            onChange={(e) =>
              setAnswers({ ...answers, [i]: e.target.value })
            }
            style={{ marginTop: 8 }}
          />

          <button
            onClick={() => evaluateAnswer(i)}
            style={{ marginTop: 8 }}
          >
            Evaluate Answer
          </button>

          {evaluations[i] && (
            <pre
              style={{
                marginTop: 10,
                background: "#000",
                padding: 10,
                whiteSpace: "pre-wrap"
              }}
            >
              {evaluations[i]}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}
