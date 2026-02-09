import { callGemini } from "../../../lib/gemini";

function scanResumeText(rawText) {
  if (!rawText) return "";

  return rawText
    .replace(/\s{2,}/g, " ")
    .replace(/page\s*\d+/gi, "")
    .replace(/copyright.*$/gi, "")
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

    const scannedText = scanResumeText(rawText);

    const prompt = `
You are an ATS resume analyzer.

The text below is extracted from a resume PDF.
It may contain formatting noise, but it represents the candidate's resume.

Analyze it as a resume.
Do not assume a specific job unless clearly mentioned.
Base your analysis on general ATS best practices.

Write the output in clean, plain text.
Do not use markdown.
Do not use bullet symbols, emojis, or special characters.
Do not use *, -, •, or numbered lists.

Structure the response exactly as follows:

ATS Score:
Give a score out of 100 and explain briefly.

Skill Coverage:
Explain which skills are clearly present and which are missing or weak.

Experience Quality:
Assess clarity, impact, and relevance of experience.

Resume Gaps:
Explain what is weak, unclear, or missing.

Improvement Suggestions:
Give concrete suggestions without inventing skills.

Resume Text:
${scannedText}
`;

    const aiResponse = await callGemini(prompt);

    return new Response(
      JSON.stringify({ analysis: aiResponse }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Analyze route error:", error);
    return new Response(
      JSON.stringify({ error: "Resume analysis failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
