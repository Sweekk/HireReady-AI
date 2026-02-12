"use client";
import { useState } from "react";
import { fileHandler } from "@/utils/fileHandler";


export default function ResumeBuilder() {
  const [file, setFile] = useState(null);
  const [requirements, setRequirements] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");

  const handleUpload = async (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setLoading(true);

    try {
      const Text = await fileHandler(selectedFile);

      if (Text) {
        console.log(Text);
        setExtractedText(Text);
      } else {
        alert("Failed to extract text from file");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error while processing file");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    if (!extractedText) {
      alert("No extracted text available");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/resumeBuild/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: extractedText,
          requirements: requirements,
        }),
      });

      const raw = await res.text();
      console.log("RAW RESPONSE FROM API:", raw);

      const data = JSON.parse(raw);

      if (!res.ok) {
        console.error("API Error:", data);
        throw new Error(data.error || "Failed to enhance resume");
      }

      setResult(data.enhancedText);
    } catch (error) {
      console.error("Enhancement Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = async () => {
    try {
      const res = await fetch("/api/resumeBuild/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: result }),
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Enhanced_Resume.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to download PDF");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Resume Builder
          </h1>
          <p className="text-gray-600">
            Upload your resume and let AI enhance it for your dream job
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, or DOCX (MAX. 10MB)
                  </p>
                  {file && (
                    <p className="mt-2 text-sm text-indigo-600 font-medium">
                      Selected: {file.name}
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleUpload(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Requirements (Optional)
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
              rows="4"
              placeholder="Paste the job description or specific requirements you want to tailor your resume for..."
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !file}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              "Enhance Resume"
            )}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Enhanced Resume
              </h2>
              <button
                onClick={downloadPdf}
                className="bg-green-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Download PDF
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 overflow-auto max-h-96">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                {result}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
