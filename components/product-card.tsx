"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Product } from "@/lib/types"
import { ShoppingCart, ExternalLink } from "lucide-react"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isEtsyProduct = !!product.etsyUrl

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="flex-1">
        <div className="text-xs font-medium text-muted-foreground uppercase">{product.category}</div>
        <h3 className="font-semibold line-clamp-2">{product.name}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        {isEtsyProduct && product.inStock === false && <p className="text-sm text-destructive mt-2">Out of Stock</p>}
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4">
        <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
        {isEtsyProduct ? (
          <Button asChild size="sm" className="gap-2" disabled={product.inStock === false}>
            <a href={product.etsyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Buy on Etsy</span>
            </a>
          </Button>
        ) : (
          <Button onClick={() => onAddToCart(product)} size="sm" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
