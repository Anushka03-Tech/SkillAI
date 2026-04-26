if (typeof global !== "undefined" && typeof (global as any).DOMMatrix === "undefined") {
  (global as any).DOMMatrix = class DOMMatrix {
    a = 1; b = 0; c = 0; d = 1; e = 0; f = 0;
  };
}

const pdfParse = require("pdf-parse");
import mammoth from "mammoth";

export async function extractTextFromUrl(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to download file from URL.");
  
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const lowerUrl = url.toLowerCase();
  let text = "";

  if (lowerUrl.endsWith(".pdf") || response.headers.get("content-type")?.includes("pdf")) {
    const data = await pdfParse(buffer);
    text = data.text;
  } else if (lowerUrl.endsWith(".docx") || response.headers.get("content-type")?.includes("wordprocessingml")) {
    const data = await mammoth.extractRawText({ buffer });
    text = data.value;
  } else {
    throw new Error("Unsupported file format. Please upload PDF or DOCX.");
  }

  return text.trim();
}
