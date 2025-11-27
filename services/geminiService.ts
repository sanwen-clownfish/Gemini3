import { GoogleGenAI, Type, Schema } from "@google/genai";
import { WorkoutExercise } from "../types";

const apiKey = process.env.API_KEY;

// Schema definition for structured output
const exerciseSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "训练动作名称 (Name of the exercise)",
      },
      description: {
        type: Type.STRING,
        description: "简要的动作指导和要领 (Brief instructions in Chinese)",
      },
      rating: {
        type: Type.NUMBER,
        description: "针对该部位的增肌效果评分 1-10分 (Effectiveness rating 1-10)",
      },
      difficulty: {
        type: Type.STRING,
        enum: ["Beginner", "Intermediate", "Advanced"],
        description: "难度等级 (Difficulty level)",
      },
      reps: {
        type: Type.STRING,
        description: "建议的组数和次数，例如 '4组 8-12次' (Recommended sets and reps in Chinese)",
      }
    },
    required: ["name", "description", "rating", "difficulty", "reps"],
  },
};

export const fetchExercises = async (muscleName: string): Promise<WorkoutExercise[]> => {
  if (!apiKey) {
    console.error("API Key is missing");
    throw new Error("API Key is missing. Please configure process.env.API_KEY.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `针对"${muscleName}"，请提供5个最高效的增肌和力量训练动作。请给出动作名称、详细但简练的执行说明、1-10分的推荐指数评分、难度以及建议的组数次数。请务必使用简体中文回答。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: exerciseSchema,
        systemInstruction: "你是一位世界级的健身教练和运动解剖学专家。你的目标是为用户提供最符合生物力学的训练建议。所有输出必须是简体中文。",
      },
    });

    const text = response.text;
    if (!text) {
      return [];
    }

    const data = JSON.parse(text) as WorkoutExercise[];
    
    // Sort by rating descending
    return data.sort((a, b) => b.rating - a.rating);

  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error;
  }
};