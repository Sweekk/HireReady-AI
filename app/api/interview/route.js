import { callGemini } from "../../../lib/gemini";

function scanResumeText(rawText) {
  if (!rawText) return "";

  return rawText
    .replace(/\s{2,}/g, " ")
    .replace(/page\s*\d+/gi, "")
    .trim()
    .slice(0, 6000);
}

export async function POST(req) {
  try {
    const { rawText } = await req.json();

    if (!rawText || !rawText.trim()) {
      return new Response(
        JSON.stringify({ error: "No resume content provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const cleanedText = scanResumeText(rawText);

    const prompt = `
You are a technical interviewer.

The text below is extracted from a candidate's resume.

Your task is to generate interview questions that assess:
- The candidate's claimed skills
- Their project experience
- Their real-world understanding

Do not ask generic HR questions.
Do not repeat questions.
Do not mention ATS or resume optimization.

Write the output in clean, plain text.
Do not use markdown.
Do not use bullet symbols or special characters.

Use the following structure exactly:

Technical Questions:
Ask 5 role-relevant technical questions based on the resume.

Project-Based Questions:
Ask 3 questions that directly reference projects or experience mentioned.

Scenario Questions:
Ask 2 real-world problem-solving questions relevant to the skills claimed.

Resume Text:
${cleanedText}
`;

    const aiResponse = await callGemini(prompt);

    return new Response(
      JSON.stringify({ questions: aiResponse }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Interview route error:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Interview question generation failed"
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
