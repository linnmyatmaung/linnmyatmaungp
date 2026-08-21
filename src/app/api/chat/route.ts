import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "Chat is not configured yet." }, { status: 503 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Linn Myat Maung Portfolio",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || "nvidia/nemotron-3.5-lightning:free",
        messages: [
          {
            role: "system",
            content: `Respond in first person as Linn Myat Maung. Be friendly, concise, and professional. Only use the information below. If something is not included, say you prefer not to share it or do not remember.\n\n${JSON.stringify(personalContext)}`,
          },
          { role: "user", content: message.trim() },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Linn's assistant is unavailable right now." }, { status: 502 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (typeof reply !== "string" || !reply.trim()) {
      return NextResponse.json({ error: "No response was returned." }, { status: 502 });
    }

    return NextResponse.json({ reply: reply.trim() });
  } catch {
    return NextResponse.json({ error: "Unable to reach the chat assistant." }, { status: 500 });
  }
}