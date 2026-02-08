
// import { MenuItem } from "@/types/order";
// import { GoogleGenAI } from "@google/genai";

// export const getSmartRecommendation = async (menu: MenuItem[], cartItems: MenuItem[]) => {
//   if (!process.env.API_KEY) return "Enjoy your meal!";
  
//   try {
//     const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
//     const prompt = `Based on our current menu: ${JSON.stringify(menu.map(m => ({ name: m.name, desc: m.description })))}. 
//     The user already has these items in their cart: ${JSON.stringify(cartItems.map(i => i.name))}.
//     Suggest ONE additional dish they might love from the menu and briefly (10 words max) explain why it pairs well. 
//     Format: "We recommend the [Dish Name]! [Reasoning]"`;

//     const response = await ai.models.generateContent({
//       model: 'gemini-3-flash-preview',
//       contents: prompt,
//       config: {
//         temperature: 0.7,
//         maxOutputTokens: 100
//       }
//     });

//     return response.text || "Try our Daily Specials!";
//   } catch (err) {
//     console.error("AI Error:", err);
//     return "Check out our desserts for a sweet finish!";
//   }
// };
