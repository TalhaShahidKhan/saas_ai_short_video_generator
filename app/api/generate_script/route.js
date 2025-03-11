import { generateScript } from "@/configs/AiModel"
import { NextResponse } from "next/server"

const BASE_PROMPT = `write a two different scripts for a 30 second video on topic : {topic}

Don't add any Scene description.
Don't add any Character or 'Narrator'.
It must be at least in 50 words.
Don't add anything in braces. Just return the plain story in text.
Give me output in JSON format  and follow the schema:

{
scripts:[
{
content:""
}
]
}

`



export async function POST(req) {
    const {topic} = await req.json()
    const PROMPT = BASE_PROMPT.replace('{topic}',topic)
    const result = generateScript.sendMessage(PROMPT)
    const resp = (await result).response.text()
    return NextResponse.json(JSON.parse(resp))
}