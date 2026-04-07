
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartDefinition = async (word: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Giải thích từ vựng tiếng Anh "${word}" theo phong cách Gen Z Việt Nam cực chill. Bao gồm nghĩa chuẩn, nghĩa bóng/slang, và một ví dụ hài hước hoặc đang viral.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          phonetic: { type: Type.STRING },
          vietnameseMeaning: { type: Type.STRING },
          definition: { type: Type.STRING },
          slangMeaning: { type: Type.STRING },
          example: { type: Type.STRING }
        },
        required: ["word", "phonetic", "vietnameseMeaning", "definition", "slangMeaning", "example"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const getSpeakingFeedback = async (sentence: string, userTranscript: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Bạn là Skibidi Bot, một giáo viên tiếng Anh cực cool. 
    Câu mẫu: "${sentence}"
    Người học đọc: "${userTranscript}"
    Hãy nhận xét ngắn gọn, hài hước bằng tiếng Việt về phát âm, chỉ ra lỗi sai và chấm điểm trên thang 100.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          tips: { type: Type.STRING }
        },
        required: ["score", "feedback", "tips"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const getQuizQuestions = async (level: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Tạo 5 câu hỏi trắc nghiệm tiếng Anh trình độ ${level} cho người Việt, phong cách hài hước. Trình bày dưới tư cách là Skibidi Bot.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            answer: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "answer", "explanation"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};
