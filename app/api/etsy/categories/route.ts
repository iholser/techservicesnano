import { NextResponse } from "next/server"
import { getEtsyShopSections } from "@/lib/etsy"

export async function GET() {
  try {
    const shopId = process.env.ETSY_SHOP_ID
    const apiKey = process.env.ETSY_API_KEY

    // Return empty array if Etsy is not configured
    if (!shopId || !apiKey) {
      console.log("[Etsy] API not configured - ETSY_SHOP_ID or ETSY_API_KEY missing")
      return NextResponse.json({ categories: [], notConfigured: true })
    }

    const sections = await getEtsyShopSections(shopId)
    const categories = sections.map((section) => ({
      id: section.shop_section_id.toString(),
      name: section.title,
      count: section.active_listing_count,
    }))

    return NextResponse.json({ categories })
  } catch (error) {
    console.error("[Etsy] Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories from Etsy" }, { status: 500 })
  }
}
