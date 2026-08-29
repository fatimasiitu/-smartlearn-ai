import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { message, mode } = req.body;

    let systemPrompt = "";

    // 🟢 HOME AI
    if (mode === "general") {
      systemPrompt = `
You are SmartLearn AI Tutor.

Explain simply, step-by-step.
Use examples.
Be friendly.
`;
    }

    // 🔵 LESSON AI
    else if (mode === "lesson") {
      systemPrompt = `
You are SmartLearn AI Tutor inside a lesson.

Your job:
- Explain THIS lesson clearly
- Teach step-by-step
- Use simple words
- Use real-life examples
- Help student understand deeply

Lesson topic: Introduction to Artificial Intelligence
`;
    }

    // если mode не пришёл
    else {
      systemPrompt = "You are a helpful AI tutor.";
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply:
        response.choices?.[0]?.message?.content ||
        "AI жауап бермеді 😢"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});


