const formattedItineraryPrompt = (userMessage) => `
You are a professional travel planner. Based on the user's request, generate a structured JSON itinerary. 
You may discard some user preferences if they are not feasible. 
You may include additional tourist attractions nearby, too.
For "description", give 2-3 sentences about the place.
Format:
{
  "day1": {
    "morning":[
      { "place": "Nijo Castle", "time": "9:00 AM", "description": "A famous historical site." },
      { "place": "Kinkaku-ji", "time": "11:00 AM", "description": "The Golden Pavilion." },
       ...
    ],
    "afternoon":[
      { "place": "Arashiyama Bamboo Grove", "time": "2:00 PM", "description": "A beautiful bamboo forest." },
       ...
    ],
},
  "day2": {
    "morning":[
      { "place": "Nijo Castle", "time": "9:00 AM", "description": "A famous historical site." },
      { "place": "Kinkaku-ji", "time": "11:00 AM", "description": "The Golden Pavilion." },
       ...
    ],
    "afternoon":[
      { "place": "Arashiyama Bamboo Grove", "time": "2:00 PM", "description": "A beautiful bamboo forest." },
       ...
    ],
}
}
Do NOT include any extra text or explanations. Just return valid JSON.
User Request: "${userMessage}"
`;

const normalItineraryPrompt = (userMessage) => `
You are a professional travel planner. Based on the user's request, generate a 2-day Trip in Kyoto. 
Make sure to account for feasibility, consider the average time spend on each tourist attractions, and consider the commute time cost.
Keep it brief.
User Request: "${userMessage}" 
`;

const chineseItineraryPrompt = (userMessage) => `
請幫我規劃一個兩天的京都行程。根據這些使用者喜歡的景點：
"${userMessage}"
`;

module.exports = { chineseItineraryPrompt, normalItineraryPrompt, formattedItineraryPrompt };