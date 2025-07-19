// app/api/generate-profile/route.ts (for App Router in Next.js)
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  const prompt = `Given the website ${url}, generate a JSON profile with:
  {
    "company_name": "",
    "company_description": "",
    "service": [],
    "tier1_keywords": [],
    "tier2_keywords": [],
  }

Do not include emails or point of contact. Try to infer as many distinct service lines as possible, based on the content of the website`;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
      }),
    });

    const rawResponse = await openaiRes.text();
    let data;
    try {
      data = JSON.parse(rawResponse);
    } catch (err) {
      console.error("Failed to parse OpenAI response as JSON:", rawResponse);
      return NextResponse.json({ error: "Invalid JSON from OpenAI", raw: rawResponse }, { status: 502 });
    }

    if (!openaiRes.ok) {
      console.error("OpenAI error:", data);
      return NextResponse.json({ error: "OpenAI API error", details: data }, { status: 500 });
    }

    const rawContent = data.choices[0].message.content;
    console.log("OpenAI GPT raw content:", rawContent);
    const parsed = JSON.parse(rawContent);
    console.log("OpenAI GPT raw content:", rawContent);

    // Garante que 'service' seja sempre um array
    if (!Array.isArray(parsed.service)) {
      if (Array.isArray(parsed.service_lines)) {
        parsed.service = parsed.service_lines;
      } else if (typeof parsed.service === "string" && parsed.service.trim() === "") {
        parsed.service = [];
      } else if (parsed.service) {
        parsed.service = [parsed.service];
      } else {
        parsed.service = [];
      }
    }

    //console.log("Final parsed.service:", parsed.service);
    return NextResponse.json({ profile: parsed });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Exception in handler:", message);
      return NextResponse.json(
        { error: "Failed to generate profile", details: message },
        { status: 500 }
      );
    }
  }

