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
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are SmartLearn AI Tutor.

Explain simply, step-by-step.
Use examples.
Be friendly.
`
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    });

    res.json({
  reply: response.choices?.[0]?.message?.content || "AI жауап бермеді 😢"
});

  } catch (err) {
    res.status(500).json({ error: "AI error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

const { message, mode } = req.body;

let systemPrompt = "";

// HOME
if (mode === "general") {
  systemPrompt = `
You are SmartLearn AI Tutor.

Explain simply, step-by-step.
Use examples.
Be friendly.
`;
}

// LESSON
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
