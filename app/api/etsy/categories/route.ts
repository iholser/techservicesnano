import { NextResponse } from "next/server"
import { getEtsyShopSections } from "@/lib/etsy"

export async function GET() {
  try {
    const shopId = process.env.ETSY_SHOP_ID

    if (!shopId) {
      return NextResponse.json({ error: "ETSY_SHOP_ID environment variable is not set" }, { status: 500 })
    }

    const sections = await getEtsyShopSections(shopId)
    const categories = sections.map((section) => ({
      id: section.shop_section_id.toString(),
      name: section.title,
      count: section.active_listing_count,
    }))

    return NextResponse.json({ categories })
  } catch (error) {
    console.error("[v0] Error fetching Etsy categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories from Etsy" }, { status: 500 })
  }
}
