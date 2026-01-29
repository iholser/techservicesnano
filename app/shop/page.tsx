"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"
import { CartSidebar } from "@/components/cart-sidebar"
import type { Cart, CartItem, Product } from "@/lib/types"
import { Monitor, Search, ShoppingCart, Loader2 } from "lucide-react"

export default function ShopPage() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notConfigured, setNotConfigured] = useState(false)

  useEffect(() => {
    async function fetchEtsyData() {
      try {
        setIsLoading(true)
        setError(null)

        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/etsy/products"),
          fetch("/api/etsy/categories"),
        ])

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch Etsy data")
        }

        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()

        if (productsData.notConfigured || categoriesData.notConfigured) {
          setNotConfigured(true)
        }

        setProducts(productsData.products || [])
        setCategories(categoriesData.categories?.map((c: any) => c.name) || [])
      } catch (err) {
        console.error("[v0] Error loading Etsy products:", err)
        setError("Failed to load products from Etsy. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEtsyData()
  }, [])

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    let result = products

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
    }

    return result
  }, [products, searchQuery, selectedCategory])

  // Cart management functions
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((item) => item.product.id === product.id)

      let newItems: CartItem[]
      if (existingItem) {
        newItems = prevCart.items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        newItems = [...prevCart.items, { product, quantity: 1 }]
      }

      const newTotal = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

      return { items: newItems, total: newTotal }
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => {
      const newItems =
        quantity === 0
          ? prevCart.items.filter((item) => item.product.id !== productId)
          : prevCart.items.map((item) => (item.product.id === productId ? { ...item, quantity } : item))

      const newTotal = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

      return { items: newItems, total: newTotal }
    })
  }

  const removeItem = (productId: string) => {
    updateQuantity(productId, 0)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Monitor className="h-6 w-6" />
            <span>Tech Services Nano</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="outline" size="icon" onClick={() => setIsCartOpen(!isCartOpen)} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-12">
        {/* Title & Search */}
        <div className="space-y-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Shop</h1>
            <p className="text-muted-foreground">
              Find the perfect hardware, software, and services for your tech needs
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10 py-6"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Categories</h3>
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Products
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading products from Etsy...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive mb-4">{error}</p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            ) : notConfigured ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Etsy shop integration is not configured yet.
                </p>
                <p className="text-sm text-muted-foreground">
                  To enable the shop, add ETSY_API_KEY and ETSY_SHOP_ID to your environment variables.
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found matching your criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory(null)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  )
}
