import { callGemini } from "../../../lib/gemini";

export async function POST(req) {
  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText || !jobDescription) {
      return new Response(
        JSON.stringify({ error: "Resume text or job description missing" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const prompt = `
You are an ATS resume analyzer.

Analyze the given resume against the given job description.

Write the output in clean, plain text.
Do not use markdown.
Do not use bullet symbols, emojis, or special characters.
Do not use *, -, •, or numbered lists.
Do not include explanations outside the sections.

Structure the response using simple section titles followed by normal sentences.
Leave a blank line between sections.

Use the following structure exactly:

ATS Score:
Give a score out of 100 and explain briefly why.

Skill Match Analysis:
Explain which skills from the job description are present in the resume and which are missing.

Resume Strengths:
Describe the strong parts of the resume in 2–3 sentences.

Resume Gaps:
Explain what is weak or missing in the resume in 2–3 sentences.

Improvement Suggestions:
Explain how the resume can be improved to better match the job description.
Do not invent skills or experience.

Resume:
${resumeText}

Job Description:
${jobDescription}
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
