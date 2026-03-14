import { NextResponse } from "next/server";
import { fetchHeroContent, fetchHeroSlides } from "@/lib/airtable";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = (searchParams.get("lang") || "en") as "en" | "am" | "ru";

  if (!["en", "am", "ru"].includes(lang)) {
    return NextResponse.json({ error: "Invalid lang" }, { status: 400 });
  }

  try {
    const [content, slides] = await Promise.all([
      fetchHeroContent(lang),
      fetchHeroSlides(lang),
    ]);

    return NextResponse.json({ content, slides });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.warn("Hero API (tables may be missing):", message);
    // When Hero/HeroSlides tables don't exist yet, return empty so app uses translations
    return NextResponse.json({ content: null, slides: [] });
  }
}
