import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";


pdfjsLib.GlobalWorkerOptions.workerSrc =
  "pdfjs-dist/legacy/build/pdf.worker.mjs";

export async function POST(req) {
  try {
    console.log("API HIT");

    const formData = await req.formData();
    const file = formData.get("file");

    console.log("File received:", file?.name, file?.type);

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();

    let extractedText = "";

    if (file.type === "application/pdf") {
      console.log("Processing PDF with legacy pdfjs");

      const loadingTask = pdfjsLib.getDocument({
        data: arrayBuffer,
        useWorkerFetch: false,
        isEvalSupported: false,
      });

      const pdf = await loadingTask.promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        text += content.items.map((item) => item.str).join(" ") + "\n";
      }

      extractedText = text;
    } 
    else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const buffer = Buffer.from(arrayBuffer);
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } 
    else {
      return Response.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    return Response.json({ text: extractedText });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
