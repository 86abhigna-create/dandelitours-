import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // AI Trip Concierge Endpoint using @google/genai
  app.post("/api/ai-recommend", async (req, res) => {
    try {
      const { prompt, travelDates, groupSize } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are Dandeli Wilds & Waters AI Trip Concierge, an expert local guide for Dandeli, Karnataka. Provide expert, enthusiastic, accurate advice about white-water rafting on the Kali River, wildlife safaris, jungle resorts, best times to visit, packing lists, and local safety rules. Format with clear headings and bullet points.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `Travel Dates: ${travelDates || 'Not specified'}. Group Size: ${groupSize || '2 guests'}. User Query: ${prompt || 'Suggest a 3-day itinerary for Dandeli.'}` }]
          }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const recommendation = response.text || "Welcome to Dandeli! Enjoy the lush Western Ghats and Kali River adventures.";
      res.json({ recommendation });
    } catch (error: any) {
      console.error("AI recommendation error:", error);
      const errMessage = error?.message || String(error);
      if (errMessage.includes("resource_exhausted") || errMessage.includes("quota") || errMessage.includes("429") || errMessage.includes("exhausted")) {
        return res.json({
          recommendation: `### 🌲 Dandeli 3-Day Eco-Adventure Itinerary (Local Expert Guide)\n\n*Note: High traffic encountered on AI service. Here is your curated local expert itinerary!*\n\n#### **Day 1: Arrival & Kali River Water Sports**\n- **Morning:** Check into your riverside eco-cottage or treehouse.\n- **Afternoon:** Head out for kayaking, coracle boat riding, and natural jacuzzi bath on the Kali River.\n- **Evening:** Relax by the campfire with authentic Malnad dinner.\n\n#### **Day 2: Thrilling White-Water Rafting & Jungle Safari**\n- **Morning:** 12km Grade III white-water rafting expedition through Stanley’s Gap.\n- **Afternoon:** Jeep safari into the Anshi-Dandeli Tiger Reserve to spot hornbills and wildlife.\n- **Evening:** Stargazing and nature walk.\n\n#### **Day 3: Syntheri Rocks & Departure**\n- **Morning:** Explore the magnificent monolithic granite monolith and Supa Dam backwaters.\n- **Afternoon:** Souvenir shopping for local spices & honey, followed by check-out.`
        });
      }
      res.status(500).json({ error: errMessage || "Failed to generate AI recommendation" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DandeliTours server running on http://localhost:${PORT}`);
  });
}

startServer();
