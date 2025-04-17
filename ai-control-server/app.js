const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Setup
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chat route
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ reply: "AI error occurred" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ AI Server running on http://localhost:${PORT}`);
});
