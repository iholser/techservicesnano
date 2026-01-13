import { NextResponse } from "next/server"
import { getEtsyShopListings, convertEtsyListingToProduct } from "@/lib/etsy"

export async function GET() {
  try {
    const shopId = process.env.ETSY_SHOP_ID

    if (!shopId) {
      return NextResponse.json({ error: "ETSY_SHOP_ID environment variable is not set" }, { status: 500 })
    }

    const listings = await getEtsyShopListings(shopId)
    const products = listings.map(convertEtsyListingToProduct)

    return NextResponse.json({ products })
  } catch (error) {
    console.error("[v0] Error fetching Etsy products:", error)
    return NextResponse.json({ error: "Failed to fetch products from Etsy" }, { status: 500 })
  }
}
