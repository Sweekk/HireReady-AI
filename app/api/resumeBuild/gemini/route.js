import { enhanceResume } from "@/lib/geminiService";
export async function POST(req) {
  try {
    const { text, requirements } = await req.json();

    if (!text || text.trim().length === 0) {
      return Response.json(
        { error: "Resume text is required" },
        { status: 400 }
      );
    }
    console.log(text);
    console.log(requirements) || "rishan";
    const enhancedText = await enhanceResume(text, requirements || "");

    return Response.json(
      { enhancedText },
      { status: 200 }
    );

  } catch (error) {
    console.error("Gemini API Error:", error);

    return Response.json(
      {
        error: "Failed to enhance resume",
        details: error.message
      },
      { status: 500 }
    );
  }
}
