import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error("GEMINI_KEY is not set in environment variables");
}

console.log("Loaded Key:", process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function enhanceResumeWithFile(fileBase64, mimeType, fileName, additionalRequirements = "") {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const fileData = {
      inlineData: {
        data: fileBase64,
        mimeType: mimeType,
      },
    };

    const prompt = `
You are an expert professional resume writer.

Your ONLY task is to return an improved, professionally enhanced version of the resume provided in the file.

STRICT RULES:
- Return ONLY the final resume content.
- Do NOT include any explanations.
- Do NOT include any notes, comments, or introductions.
- Do NOT include sections like "Improvements Made" or "Explanation".
- Do NOT add any extra text before or after the resume.
- The response must contain ONLY the resume formatted for direct use in a PDF.

${additionalRequirements 
  ? `Additional user requirements to follow: "${additionalRequirements}".`
  : ""}

Please analyze the resume in the attached file and enhance it accordingly.
`;

    const result = await model.generateContent([prompt, fileData]);

    if (!result || !result.response) {
      throw new Error("No response received from Gemini API");
    }

    const enhancedText = result.response.text();

    if (!enhancedText) {
      throw new Error("Gemini API returned empty response");
    }

    return enhancedText;

  } catch (error) {
    console.error("Gemini Service Error:", error);

    let errorMessage = "Failed to enhance resume";

    if (error.message.includes("API key")) {
      errorMessage = "Invalid or missing Gemini API key";
    } else if (error.message.includes("quota")) {
      errorMessage = "Gemini API quota exceeded";
    } else if (error.message.includes("network")) {
      errorMessage = "Network error while connecting to Gemini API";
    } else if (error.message) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
}

export async function enhanceResume(text, additionalRequirements = "") {

  try {
    
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      throw new Error("Valid resume text is required");
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview"
    });

     const prompt = `
You are an expert professional resume writer.

Your ONLY task is to return an improved, professionally enhanced version of the resume provided below.

STRICT RULES:
- Return ONLY the final resume content.
- Do NOT include any explanations.
- Do NOT include any notes, comments, or introductions.
- Do NOT include sections like "Improvements Made" or "Explanation".
- Do NOT add any extra text before or after the resume.
- The response must contain ONLY the resume formatted for direct use in a PDF.

${additionalRequirements 
  ? `Additional user requirements to follow: "${additionalRequirements}".`
  : ""}

ORIGINAL RESUME CONTENT:
${text}
`;

    const result = await model.generateContent(prompt);

    
    if (!result || !result.response) {
      throw new Error("No response received from Gemini API");
    }

    const enhancedText = result.response.text();

    if (!enhancedText) {
      throw new Error("Gemini API returned empty response");
    }

    return enhancedText;

  } catch (error) {
    console.error("Gemini Service Error:", error);

    
    let errorMessage = "Failed to enhance resume";

    if (error.message.includes("API key")) {
      errorMessage = "Invalid or missing Gemini API key";
    } else if (error.message.includes("quota")) {
      errorMessage = "Gemini API quota exceeded";
    } else if (error.message.includes("network")) {
      errorMessage = "Network error while connecting to Gemini API";
    } else if (error.message) {
      errorMessage = error.message;
    }

    
    throw new Error(errorMessage);
  }
}
