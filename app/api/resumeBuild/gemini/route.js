import { enhanceResumeWithFile } from "@/lib/geminiService";

export async function POST(req) {
  try {
    const { file, mimeType, fileName, requirements } = await req.json();

    if (!file || file.trim().length === 0) {
      return Response.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }

    if (!mimeType) {
      return Response.json(
        { error: "File MIME type is required" },
        { status: 400 }
      );
    }

    console.log("Processing file:", fileName, "with MIME type:", mimeType);
    
    const enhancedText = await enhanceResumeWithFile(file, mimeType, fileName, requirements || "");

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
