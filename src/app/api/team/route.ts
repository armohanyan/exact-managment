import { NextResponse } from "next/server";
import { fetchTeam } from "@/lib/airtable";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = (searchParams.get("lang") || "en") as "en" | "hy" | "ru";
  if (!["en", "hy", "ru"].includes(lang)) {
    return NextResponse.json({ error: "Invalid lang" }, { status: 400 });
  }
  try {
    const team = await fetchTeam(lang);
    return NextResponse.json(team);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Team API error:", message);
    return NextResponse.json(
      { error: "Failed to fetch team", details: message },
      { status: 500 }
    );
  }
}
