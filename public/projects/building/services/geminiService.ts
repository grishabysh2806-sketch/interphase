import { GoogleGenAI, Type } from "@google/genai";
import { EstimateResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateConstructionEstimate = async (userDescription: string): Promise<EstimateResult> => {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    Вы — опытный прораб и сметчик строительной компании "СтройМастер". 
    Ваша задача — проанализировать запрос клиента и создать предварительную смету на строительство или ремонт.
    Будьте реалистичны в ценах (используйте средние рыночные цены в рублях).
    Ответ должен быть строго структурирован.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: `Создай смету для следующего проекта: ${userDescription}`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          projectName: { type: Type.STRING, description: "Краткое название проекта" },
          description: { type: Type.STRING, description: "Профессиональное описание работ" },
          materials: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                item: { type: Type.STRING, description: "Название материала" },
                cost: { type: Type.NUMBER, description: "Цена за единицу" },
                unit: { type: Type.STRING, description: "Единица измерения (шт, м2, кг, л)" },
                quantity: { type: Type.NUMBER, description: "Количество" }
              }
            }
          },
          laborCost: { type: Type.NUMBER, description: "Общая стоимость работ" },
          totalEstimatedCost: { type: Type.NUMBER, description: "Итоговая сумма (материалы + работы)" },
          timelineDays: { type: Type.NUMBER, description: "Примерный срок выполнения в днях" },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3-4 совета профессионала по этому проекту"
          }
        },
        required: ["projectName", "description", "materials", "laborCost", "totalEstimatedCost", "timelineDays", "recommendations"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from Gemini");
  }

  return JSON.parse(text) as EstimateResult;
};