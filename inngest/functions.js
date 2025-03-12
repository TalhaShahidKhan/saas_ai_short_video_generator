import axios from "axios";
import { inngest } from "./client";
import { createClient } from "@deepgram/sdk";
import { generateImageScript } from "@/configs/AiModel";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
const BASE_URL = "https://aigurulab.tech";

const ImageGeneratingPrompt = `Generate Image prompt of {style} style with all details for each scene for 30 seconds video : script: {script} 

- Just give specifing image prompt depends on the story line
- do not give camera angle image prompt
- Follow the following schema and return JSON data (Max 4-5 Images)
- [
    {
      imagePrompt:'',
      sceneContent: '<Script Content>'
    }
  ]
`;

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const GenerateVideoData = inngest.createFunction(
  { id: "generate-audio-data" },
  { event: "generate-audio-data" },
  async ({ event, step }) => {
    const { script, topic, title, captionStyle, videoStyle, voice, recordId } =
      event.data;

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    const generateAudioFile = await step.run("GenerateAudioFile", async () => {
      const result = await axios.post(
        BASE_URL + "/api/text-to-speech",
        {
          input: script.content,
          voice: voice.value,
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
            "Content-Type": "application/json", // Content Type
          },
        }
      );
      return result.data.audio;
    });

    const generateCaptions = await step.run("generate caption", async () => {
      const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);
      const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        {
          url: generateAudioFile,
        },
        // STEP 3: Configure Deepgram options for audio analysis
        {
          model: "nova-3",
        }
      );
      return result.results.channels[0].alternatives[0].words;
    });

    const generateImagePrompt = await step.run(
      "generateImagePrompt",
      async () => {
        const FINAL_PROMPT = ImageGeneratingPrompt.replace(
          "{style}",
          videoStyle
        ).replace("{script}", script.content);
        const imgresp = generateImageScript.sendMessage(FINAL_PROMPT);
        const resp = JSON.parse((await imgresp).response.text());
        return resp;
      }
    );

    const generateImage = await step.run("genrateImage", async () => {
      let images = [];
      images = await Promise.all(
        generateImagePrompt.map(async (element) => {
          const result = await axios.post(
            BASE_URL + "/api/generate-image",
            {
              width: 1024,
              height: 1024,
              input: element.imagePrompt,
              model: "sdxl", //'flux'
              aspectRatio: "1:1", //Applicable to Flux model only
            },
            {
              headers: {
                "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
                "Content-Type": "application/json", // Content Type
              },
            }
          );
          console.log(result.data.image);
          return result.data.image; //Output Result: Base 64 Image
        })
      );
      return images;
    });

    const updateDB = await step.run("updateDB", async () => {
      const result = await convex.mutation(api.videoData.UpdateVideoData, {
        recordId: recordId,
        audioUrl: generateAudioFile,
        captionJson: generateCaptions,
        images: generateImage,
      });
      return result;
    });

    return "Executed successfully";
  }
);
