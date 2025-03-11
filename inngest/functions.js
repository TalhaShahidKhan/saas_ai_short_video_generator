import axios from "axios";
import { inngest } from "./client";
const BASE_URL = "https://aigurulab.tech";
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
    const { script, topic, title, captionStyle, videoStyle, voice } =
      event.data;
      console.log(script)
    const generateAudioFile = await step.run("GenerateAudioFile", async () => {
      const result = await axios.post(BASE_URL+'/api/text-to-speech',
        {
            input: script.content,
            voice: voice.value
        },
        {
            headers: {
                'x-api-key': process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
     console.log(result.data.audio) //Outpu
      return result.data.audio; //Output Result: Audio Mp3 Url
    });
    return generateAudioFile;
  }
);
