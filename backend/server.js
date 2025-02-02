require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { chineseItineraryPrompt, normalItineraryPrompt, formattedItineraryPrompt } = require("./prompts");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5001;

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const prompt = formattedItineraryPrompt(message);
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`✅ Backend server running on port ${PORT}`));
