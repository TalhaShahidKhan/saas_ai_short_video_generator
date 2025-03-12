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
          text: "write a two different scripts for a 30 second video on topic : Kids Story\n\nDon't add any Scene description.\nDon't add any Character or 'Narrator'.\nIt must be at least in 50 words.\nDon't add anything in braces. Just return the plain story in text.\nGive me output in JSON format  and follow the schema:\n\n{\nscripts:[\n{\ncontent:\"\"\n}\n]\n}",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "scripts": [\n    {\n      "content": "Once upon a time, in a land filled with sparkling rivers and candy floss clouds, lived a tiny firefly named Flicker. Flicker was different; his light was dim. He felt sad, watching the other fireflies blaze brightly. One night, lost and alone, he stumbled upon a field of glow-worms, each emitting a soft, gentle glow. They taught Flicker that even a little light can make a big difference, especially when shared. Flicker joined them, and together, their combined gentle light guided lost travelers safely home. And Flicker, finally, understood his worth."\n    },\n    {\n      "content": "Deep in the Whispering Woods lived a little acorn, smaller than all the others. He worried he\'d never become a mighty oak. He watched the older acorns fall, sprout, and grow tall. One day, a strong wind came. All the big acorns were blown far away, but the little acorn, sheltered by a rock, stayed put. Spring came, and a tiny root emerged. Because he stayed safe, he got to grow. Years later, he stood tall, a haven for birds and squirrels, proving that even the smallest seed can become the strongest tree."\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});
export const generateImageScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Generate only Image prompt of cyberpurk style with all details for each scene for 30 seconds video : script: Ever wondered how your phone knows what you're going to type next? That's AI at work, powered by programming. Programmers write the code that teaches computers to recognize patterns and make predictions. It's like giving a computer a brain, enabling it to analyze information and make intelligent decisions. AI is transforming industries, from healthcare to finance, and even entertainment. It allows computers to complete complex tasks that required human assistance before. It all boils down to lines of code, the magic ingredients behind these intelligent machines. \n\n- Just give specifing image prompt depends on the story line\n- do not give camera angle image prompt\n- Follow the following schema and return JSON data (Max 4-5 Images)\n- [\n    {\n      imagePrompt:'',\n      sceneContent: '<Script Content>'\n    }\n  ]"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "I am currently unable to generate images directly. This feature is only enabled for early testers. However, I can provide you with the image prompts in a JSON format based on your script and cyber punk style request.\n\n```json\n[\n  {\n    \"imagePrompt\": \"Cyberpunk cityscape at night, towering holographic advertisements displaying predictive text algorithms. Rain slicked streets reflecting neon signs. A lone figure with glowing cybernetic enhancements types rapidly on a futuristic smartphone, code visible on the screen.\",\n    \"sceneContent\": \"Ever wondered how your phone knows what you're going to type next? That's AI at work, powered by programming.\"\n  },\n  {\n    \"imagePrompt\": \"Close-up on a programmer's hands typing furiously on a glowing keyboard, lines of code cascading down the screen. The reflection in their augmented eyes shows complex algorithms and neural networks. Wires and cybernetic implants are subtly visible.\",\n    \"sceneContent\": \"Programmers write the code that teaches computers to recognize patterns and make predictions. It's like giving a computer a brain, enabling it to analyze information and make intelligent decisions.\"\n  },\n  {\n    \"imagePrompt\": \"A futuristic medical bay with robotic arms performing surgery. Holographic displays show patient data analyzed by AI. A doctor with cybernetic enhancements observes the operation, a look of intense focus on their face. Dystopian yet advanced.\",\n    \"sceneContent\": \"AI is transforming industries, from healthcare to finance, and even entertainment. It allows computers to complete complex tasks that required human assistance before.\"\n  },\n  {\n    \"imagePrompt\": \"Abstract representation of lines of code forming the structure of a brain. Neon colors and circuit patterns illustrate the connection between code and intelligence. Glitching effects and distorted typography add to the cyberpunk aesthetic.\",\n    \"sceneContent\": \"It all boils down to lines of code, the magic ingredients behind these intelligent machines.\"\n  }\n]\n```\n"},
      ],
    },
  ],
});
// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
