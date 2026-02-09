import { callGemini } from "../../../../lib/gemini";

export async function POST(req) {
  try {
    const { question, answer } = await req.json();

    if (!question || !answer) {
      return new Response(
        JSON.stringify({ error: "Question or answer missing" }),
        { status: 400 }
      );
    }

    const prompt = `
You are a technical interviewer.

Evaluate the candidate's answer to the interview question.

Do not be harsh.
Do not be overly generous.

Provide:
- A score out of 10
- Brief feedback explaining strengths and weaknesses

Write in plain text.
Do not use markdown or bullet points.

Question:
${question}

Candidate Answer:
${answer}
`;

    const response = await callGemini(prompt);

    return new Response(
      JSON.stringify({ evaluation: response }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || "Answer evaluation failed"
      }),
      { status: 503 }
    );
  }
}
