import { NextResponse } from "next/server";
import { fetchProjects } from "@/lib/airtable";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = (searchParams.get("lang") || "en") as "en" | "am" | "ru";
  
  if (!["en", "am", "ru"].includes(lang)) {
    return NextResponse.json({ error: "Invalid lang" }, { status: 400 });
  }

  try {
    const projects = await fetchProjects(lang);
    return NextResponse.json(projects);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Projects API error:", message);
    
    return NextResponse.json(
      { error: "Failed to fetch projects", details: message },
      { status: 500 }
    );
  }
}
