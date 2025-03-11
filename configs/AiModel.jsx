const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMENI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const generateScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "write a two different scripts for a 30 second video on topic : Kids Story\n\nDon't add any Scene description.\nDon't add any Character or 'Narrator'.\nIt must be at least in 50 words.\nDon't add anything in braces. Just return the plain story in text.\nGive me output in JSON format  and follow the schema:\n\n{\nscripts:[\n{\ncontent:\"\"\n}\n]\n}"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"scripts\": [\n    {\n      \"content\": \"Once upon a time, in a land filled with sparkling rivers and candy floss clouds, lived a tiny firefly named Flicker. Flicker was different; his light was dim. He felt sad, watching the other fireflies blaze brightly. One night, lost and alone, he stumbled upon a field of glow-worms, each emitting a soft, gentle glow. They taught Flicker that even a little light can make a big difference, especially when shared. Flicker joined them, and together, their combined gentle light guided lost travelers safely home. And Flicker, finally, understood his worth.\"\n    },\n    {\n      \"content\": \"Deep in the Whispering Woods lived a little acorn, smaller than all the others. He worried he'd never become a mighty oak. He watched the older acorns fall, sprout, and grow tall. One day, a strong wind came. All the big acorns were blown far away, but the little acorn, sheltered by a rock, stayed put. Spring came, and a tiny root emerged. Because he stayed safe, he got to grow. Years later, he stood tall, a haven for birds and squirrels, proving that even the smallest seed can become the strongest tree.\"\n    }\n  ]\n}\n```"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
