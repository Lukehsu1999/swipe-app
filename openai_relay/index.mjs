import axios from "axios";

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { message } = body;

        if (!message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Message is required" }),
            };
        }

        const openAiResponse = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: message },
                ],
                temperature: 0.7,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: openAiResponse.data.choices[0].message.content }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
