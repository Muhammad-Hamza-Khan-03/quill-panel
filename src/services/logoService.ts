import { GoogleGenAI } from "@google/genai";

export async function generateLogo() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: "A minimalist and elegant logo for a luxury brand named 'Pashmina Luxury'. The logo should feature a stylized, abstract representation of a pashmina shawl or a soft fiber weave, conveying high-end quality, softness, and Himalayan heritage. Use a sophisticated color palette like deep navy and gold. Clean lines, vector style, bigger and No background",
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
      },
    },
  });

  if (!response.candidates?.[0]?.content?.parts) {
    return null;
  }

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}
