import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;

const UNAVAILABLE =
  "Linn's assistant is unavailable right now. Please try again in a moment.";

const personalContext = {
  name: "Linn Myat Maung",
  nickname: "Lucas",
  location: "Yangon, Myanmar",
  occupation: "Software Engineer | Full Stack Developer | Java Developer",
  quote:
    "I wasn't born to live easy. I was born to write, build, fail, rise, and fly.",
  personality: "Ambivert | INFJ",
  values: ["Honesty", "Curiosity", "Growth mindset"],
  education: "Bachelor of Science in Computer Science, University of the People, 2025",
  skills: [
    "Java", "C/C++", "C#", "React Native", "Flutter", "Spring Boot",
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express.js",
    "RESTful API", "SQL", "MongoDB", "AWS",
  ],
  favouriteTechnologies: ["React", "TanStack Query", "Redux Toolkit", "AWS"],
  hobbies: ["Coding", "Reading", "Listening to music", "Gym"],
  favourites: {
    music: ["Hip Hop", "Trap", "Drill", "Jersey"],
    artists: ["Juice WRLD"],
    movies: ["Peaky Blinders", "Money Heist", "Harry Potter"],
    anime: ["One Piece", "Jujutsu Kaisen", "Your Name"],
  },
};

function siteUrl(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) return origin;
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch {
      // ignore invalid referer
    }
  }
  return process.env.NEXT_PUBLIC_SITE_URL || "https://linnmyatmaung.netlify.app";
}

function openRouterTimeoutMs() {
  if (process.env.VERCEL === "1") return 8000;
  return 24000;
}

async function completeChat(request: Request, message: string, apiKey: string) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": siteUrl(request),
      "X-Title": "Linn Myat Maung Portfolio",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3.2-3b-instruct:free",
      max_tokens: 250,
      messages: [
        {
          role: "system",
          content: `Respond in first person as Linn Myat Maung. Be friendly, concise, and professional. Only use the information below. If something is not included, say you prefer not to share it or do not remember.\n\n${JSON.stringify(personalContext)}`,
        },
        { role: "user", content: message },
      ],
    }),
    signal: AbortSignal.timeout(openRouterTimeoutMs()),
  });

  const text = await response.text();
  return { response, text };
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY?.trim();
    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is not set");
      return NextResponse.json(
        { error: "The chat assistant is not configured yet." },
        { status: 503 }
      );
    }

    const { response, text } = await completeChat(request, message.trim(), apiKey);

    if (!response.ok) {
      console.error("OpenRouter error", response.status, text.slice(0, 500));
      return NextResponse.json({ error: UNAVAILABLE }, { status: 502 });
    }

    const contentType = response.headers.get("content-type") ?? "";
    const looksLikeJson =
      contentType.includes("application/json") || text.trim().startsWith("{");
    if (!looksLikeJson) {
      console.error("OpenRouter returned non-JSON", text.slice(0, 500));
      return NextResponse.json({ error: UNAVAILABLE }, { status: 502 });
    }

    const data = JSON.parse(text) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content;

    if (typeof reply !== "string" || !reply.trim()) {
      return NextResponse.json({ error: "No response was returned." }, { status: 502 });
    }

    return NextResponse.json({ reply: reply.trim() });
  } catch (error) {
    console.error("Chat route error", error);
    return NextResponse.json({ error: UNAVAILABLE }, { status: 500 });
  }
}
