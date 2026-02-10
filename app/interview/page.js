"use client";

import { useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { useInterviewStore } from "./../store/useInterviewStore";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

export default function InterviewTestPage() {
  const fileInputRef = useRef(null);

  const {
    resumeText,
    questions,
    answers,
    evaluations,
    interviewStarted,
    loading,
    error,

    setResumeText,
    setQuestions,
    setAnswer,
    setEvaluation,
    setInterviewStarted,
    setLoading,
    setError,
    resetInterview,
  } = useInterviewStore();

  /* ---------------- PDF UPLOAD ---------------- */
  async function handlePDFUpload(file) {
    if (!file) return;

    try {
      setError("");
      const arrayBuffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
        disableWorker: true,
      }).promise;

      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(" ") + "\n";
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
    resetInterview();

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: resumeText }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const extractedQuestions = data.questions
        .split("\n")
        .map((q) => q.trim())
        .filter((q) => q.endsWith("?"));

      setQuestions(extractedQuestions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  /* EVALUATE ANSWER  */
  async function evaluateAnswer(index) {
    const question = questions[index];
    const answer = answers[index];

    if (!answer?.trim()) return;

    const res = await fetch("/api/interview/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer }),
    });

    const data = await res.json();
    setEvaluation(index, data.evaluation);
  }

  
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Mock Interview</h1>
          <p className="text-gray-400 text-sm">
            Upload your resume and practice interview questions tailored to you.
          </p>
        </header>

        {/* RESUME INPUT */}
        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-2xl p-6 space-y-4">
          <textarea
            rows={6}
            placeholder="Paste resume text here or upload a PDF"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="w-full bg-[#111] rounded-xl p-4 text-sm outline-none resize-none border border-neutral-700"
          />

          <div className="flex items-center gap-4">
            <button
              onClick={() => fileInputRef.current.click()}
              className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition text-sm"
            >
              Upload Resume PDF
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              hidden
              onChange={(e) => handlePDFUpload(e.target.files[0])}
            />

            <button
              onClick={generateQuestions}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition text-sm"
            >
              {loading ? "Generating..." : "Generate Questions"}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        {/* START INTERVIEW */}
        {questions.length > 0 && !interviewStarted && (
          <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-6 flex items-center justify-between">
            <p className="text-gray-300">
              {questions.length} questions generated
            </p>
            <button
              onClick={() => setInterviewStarted(true)}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition"
            >
              Start Interview
            </button>
          </div>
        )}

        {/* INTERVIEW */}
        {interviewStarted && (
          <div className="space-y-8">
            {questions.map((q, i) => (
              <div
                key={i}
                className="bg-[#1b1b1b] border border-neutral-800 rounded-2xl p-6 space-y-4"
              >
                <h3 className="font-medium">
                  Question {i + 1}
                </h3>

                <p className="text-gray-300">{q}</p>

                <textarea
                  rows={4}
                  placeholder="Type your answer here..."
                  className="w-full bg-[#111] rounded-xl p-4 text-sm outline-none resize-none border border-neutral-700"
                  value={answers[i] || ""}
                  onChange={(e) => setAnswer(i, e.target.value)}
                />

                <button
                  onClick={() => evaluateAnswer(i)}
                  className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition text-sm"
                >
                  Evaluate Answer
                </button>

                {evaluations[i] && (
                  <div className="bg-black rounded-xl p-4 border border-neutral-700">
                    <p className="text-sm text-gray-300 whitespace-pre-wrap">
                      {evaluations[i]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
