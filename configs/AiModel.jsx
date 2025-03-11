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
        {
          text: 'write a two different scripts for a 30 second video on topic : Kids Story\n\n- Give me output in JSON format  and follow the schema:\n- {\n   scripts:[\n      {\n    content:""\n}\n]\n}',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "scripts": [\n    {\n      "content": "**Video 1: Animated Story Teaser**\\n\\n**(Scene: Open on a vibrant, colorful illustration of a whimsical forest.)**\\n\\n**(0-5 seconds) NARRATOR (Warm, inviting voice):** Deep in the Whispering Woods, lived a little firefly with a very big problem.\\n\\n**(5-10 seconds) (Show a close-up of a cute, but slightly worried, firefly character.)**\\n\\n**(10-15 seconds) NARRATOR:** Sparkle couldn\'t... well, sparkle!\\n\\n**(15-20 seconds) (Quick cuts: Sparkle trying to light up, failing; other fireflies glowing brightly; Sparkle looking sad.)**\\n\\n**(20-25 seconds) NARRATOR:** But one day, he stumbled upon a secret. A secret that could change everything.\\n\\n**(25-30 seconds) (End on a captivating image: Sparkle looking determined, walking towards a mysterious glowing object in the distance. Text overlay: \\"Sparkle\'s Secret. Coming Soon!\\")**"\n    },\n    {\n      "content": "**Video 2: Real Kid Reading a Book**\\n\\n**(Scene: A cozy room. A child (age 6-8) is sitting comfortably, holding a brightly illustrated children\'s book.)**\\n\\n**(0-5 seconds) (Child smiles at the camera.)**\\n\\n**(5-10 seconds) CHILD:** Hi! Want to hear a story?\\n\\n**(10-15 seconds) (Child opens the book and begins reading with enthusiasm.)**\\n\\n**(15-20 seconds) CHILD:** \\"...and the brave little knight faced the dragon! But the dragon wasn\'t scary at all. He just wanted a friend!\\" \\n\\n**(20-25 seconds) (Child looks up at the camera, showing a picture in the book of the knight and dragon.)**\\n\\n**(25-30 seconds) CHILD:** This story is so good! Find more amazing stories [Bookstore Name/Website]! (Child winks) \\n\\n**(Optional: Text overlay: [Bookstore Name/Website] during last 5 seconds.)**"\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
