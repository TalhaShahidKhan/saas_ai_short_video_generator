import { generateScript } from "@/configs/AiModel"
import { NextResponse } from "next/server"

const BASE_PROMPT = `write a plain two different scripts  on topic : {topic}\n\n- Give me output in JSON format  and follow the schema:\n- {\n   scripts:[\n      {\n    content:""\n}\n]\n}`



export async function POST(req) {
    const {topic} = await req.json()
    const PROMPT = BASE_PROMPT.replace('{topic}',topic)
    const result = generateScript.sendMessage(PROMPT)
    const resp = (await result).response.text()
    return NextResponse.json(JSON.parse(resp))
}