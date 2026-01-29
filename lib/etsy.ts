// Etsy API integration utilities
// Documentation: https://developers.etsy.com/documentation/

export interface EtsyListing {
  listing_id: number
  title: string
  description: string
  price: {
    amount: number
    divisor: number
    currency_code: string
  }
  quantity: number
  url: string
  state: string
  taxonomy_id: number
  tags: string[]
  images?: EtsyImage[]
}

export interface EtsyImage {
  listing_id: number
  listing_image_id: number
  url_75x75: string
  url_170x135: string
  url_570xN: string
  url_fullxfull: string
}

export interface EtsyShopSection {
  shop_section_id: number
  title: string
  rank: number
  user_id: number
  active_listing_count: number
}

// Convert Etsy listing to our Product type
export function convertEtsyListingToProduct(listing: EtsyListing) {
  const price = listing.price.amount / listing.price.divisor
  const imageUrl = listing.images?.[0]?.url_570xN || "/placeholder.svg"

  return {
    id: listing.listing_id.toString(),
    name: listing.title,
    description: listing.description.substring(0, 200) + (listing.description.length > 200 ? "..." : ""),
    price: price,
    category: "Products", // Will be updated with shop sections
    image: imageUrl,
    etsyUrl: listing.url, // External Etsy link
    inStock: listing.quantity > 0,
  }
}

// Fetch active listings from Etsy shop
export async function getEtsyShopListings(shopId: string) {
  const apiKey = process.env.ETSY_API_KEY

  if (!apiKey) {
    throw new Error("ETSY_API_KEY environment variable is not set")
  }

  const response = await fetch(
    `https://openapi.etsy.com/v3/application/shops/${shopId}/listings/active?limit=100&includes=Images`,
    {
      headers: {
        "x-api-key": apiKey,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    },
  )

  if (!response.ok) {
    throw new Error(`Etsy API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data.results as EtsyListing[]
}

// Fetch shop sections (categories)
export async function getEtsyShopSections(shopId: string) {
  const apiKey = process.env.ETSY_API_KEY

  if (!apiKey) {
    throw new Error("ETSY_API_KEY environment variable is not set")
  }

  const response = await fetch(`https://openapi.etsy.com/v3/application/shops/${shopId}/sections`, {
    headers: {
      "x-api-key": apiKey,
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Etsy API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data.results as EtsyShopSection[]
}

// Get listings by section ID
export async function getEtsyListingsBySection(shopId: string, sectionId: number) {
  const apiKey = process.env.ETSY_API_KEY

  if (!apiKey) {
    throw new Error("ETSY_API_KEY environment variable is not set")
  }

  const response = await fetch(
    `https://openapi.etsy.com/v3/application/shops/${shopId}/listings/active?shop_section_ids=${sectionId}&limit=100&includes=Images`,
    {
      headers: {
        "x-api-key": apiKey,
      },
      next: { revalidate: 3600 },
    },
  )

  if (!response.ok) {
    throw new Error(`Etsy API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data.results as EtsyListing[]
}
