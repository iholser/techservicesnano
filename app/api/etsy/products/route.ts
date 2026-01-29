import { NextResponse } from "next/server"
import { getEtsyShopListings, convertEtsyListingToProduct } from "@/lib/etsy"

export async function GET() {
  try {
    const shopId = process.env.ETSY_SHOP_ID
    const apiKey = process.env.ETSY_API_KEY

    // Return empty array if Etsy is not configured
    if (!shopId || !apiKey) {
      console.log("[Etsy] API not configured - ETSY_SHOP_ID or ETSY_API_KEY missing")
      return NextResponse.json({ products: [], notConfigured: true })
    }

    const listings = await getEtsyShopListings(shopId)
    const products = listings.map(convertEtsyListingToProduct)

    return NextResponse.json({ products })
  } catch (error) {
    console.error("[Etsy] Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products from Etsy" }, { status: 500 })
  }
}
