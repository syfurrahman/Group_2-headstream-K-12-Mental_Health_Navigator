
// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express(); // ✅ This was missing!

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`
      },
      body: JSON.stringify({
        model: "grok-2-latest",
        temperature: 0.7,
        stream: false,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      console.error("Grok response issue:", data);
      return res.status(500).json({ error: "Unexpected Grok response format" });
    }

    const reply = data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("Error connecting to Grok AI:", err);
    res.status(500).json({ error: "Grok AI request failed" });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
