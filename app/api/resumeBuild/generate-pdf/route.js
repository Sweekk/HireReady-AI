import PDFDocument from "pdfkit";
import path from "path";

export async function POST(req) {
  try {
    const { content } = await req.json();

    if (!content) {
      return Response.json(
        { error: "No content provided" },
        { status: 400 }
      );
    }

    const fontPath = path.join(
      process.cwd(),
      "app",
      "fonts",
      "Roboto-VariableFont_wdth,wght.ttf"
    );

    const doc = new PDFDocument({
      margin: 40,
      font: fontPath
    });

    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));

    const pdfPromise = new Promise((resolve) => {
      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });
    });

    doc.fontSize(12).text(content, {
      align: "left"
    });

    doc.end();

    const pdfBuffer = await pdfPromise;

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=Enhanced_Resume.pdf"
      }
    });

  } catch (error) {
    console.error("PDF Generation Error:", error);

    return Response.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

