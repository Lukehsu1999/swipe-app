const formattedItineraryPrompt = (userMessage) => `
You are a professional travel planner. Based on the user's request, generate a structured JSON itinerary. 
Format:
{
  "day1": [
    { "place": "Nijo Castle", "time": "9:00 AM", "description": "A famous historical site." }
  ],
  "day2": [
    { "place": "Fushimi Inari Shrine", "time": "8:00 AM", "description": "Iconic torii gates and hiking trails." }
  ]
}
Do NOT include any extra text or explanations. Just return valid JSON.
User Request: "${userMessage}"
`;

const normalItineraryPrompt = (userMessage) => `
You are a professional travel planner. Based on the user's request, generate a 3-day Trip in Kyoto. 
Make sure to account for feasibility, consider the average time spend on each tourist attractions, and consider the commute time cost.
User Request: "${userMessage}" 
`;

module.exports = { normalItineraryPrompt, formattedItineraryPrompt };