import { NextResponse } from "next/server";
import { createContactRecord, isAirtableConfigured } from "@/lib/airtable";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!isAirtableConfigured()) {
      return NextResponse.json(
        { error: "Contact form is not configured. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID." },
        { status: 503 }
      );
    }

    await createContactRecord({ name, email, message });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
