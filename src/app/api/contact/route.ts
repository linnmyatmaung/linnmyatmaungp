import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ACCESS_KEY = "23c6718a-aed8-4c96-b3d4-e12b090557dd";

async function readFields(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = await request.json();
    return {
      name: typeof body.name === "string" ? body.name : "",
      email: typeof body.email === "string" ? body.email : "",
      message: typeof body.message === "string" ? body.message : "",
    };
  }

  const form = await request.formData();
  return {
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    message: String(form.get("message") ?? ""),
  };
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await readFields(request);

    if (!name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const payload = new FormData();
    payload.append("access_key", ACCESS_KEY);
    payload.append("name", name.trim());
    payload.append("email", email.trim());
    payload.append("message", message.trim());
    payload.append("subject", `Portfolio contact from ${name.trim()}`);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: payload,
    });

    const text = await response.text();
    const looksLikeJson =
      (response.headers.get("content-type") ?? "").includes("application/json") ||
      text.trim().startsWith("{");
    let data: { success?: boolean } | null = null;
    if (looksLikeJson) {
      try {
        data = JSON.parse(text) as { success?: boolean };
      } catch {
        data = null;
      }
    }

    if (!data?.success) {
      return NextResponse.json({ error: "Unable to send message." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route error", error);
    return NextResponse.json({ error: "Unable to send message." }, { status: 500 });
  }
}
