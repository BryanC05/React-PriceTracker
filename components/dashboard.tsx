"use client"

import { ProductCard } from "./product-card"
import { PriceChart } from "./price-chart"
import { useState } from "react"
import { Card } from "@/components/ui/card"

interface Product {
  id: number
  name: string
  url: string
  currentPrice: number
  originalPrice: number
  priceHistory: Array<{ date: string; price: number }>
  targetPrice: number
  category: string
  addedDate: string
}

interface DashboardProps {
  products: Product[]
  onRemoveProduct: (id: number) => void
  onUpdatePrice: (id: number, price: number) => void
}

export function Dashboard({ products, onRemoveProduct, onUpdatePrice }: DashboardProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0] || null)

  const stats = {
    totalTracking: products.length,
    priceDropped: products.filter((p) => p.currentPrice < p.originalPrice).length,
    totalSaved: products.reduce((sum, p) => sum + (p.originalPrice - p.currentPrice), 0),
    alertsTriggered: products.filter((p) => p.currentPrice <= p.targetPrice).length,
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel - Products List */}
      <div className="lg:col-span-1">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-card border-border p-4">
            <div className="text-sm text-muted-foreground mb-1">Tracking</div>
            <div className="text-2xl font-bold text-foreground">{stats.totalTracking}</div>
          </Card>
          <Card className="bg-card border-border p-4">
            <div className="text-sm text-muted-foreground mb-1">Dropped</div>
            <div className="text-2xl font-bold text-accent">{stats.priceDropped}</div>
          </Card>
          <Card className="bg-card border-border p-4">
            <div className="text-sm text-muted-foreground mb-1">Saved</div>
            <div className="text-2xl font-bold text-foreground">${stats.totalSaved.toFixed(2)}</div>
          </Card>
          <Card className="bg-card border-border p-4">
            <div className="text-sm text-muted-foreground mb-1">Alerts</div>
            <div className="text-2xl font-bold text-destructive">{stats.alertsTriggered}</div>
          </Card>
        </div>

        {/* Products List */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedProduct?.id === product.id}
              onSelect={() => setSelectedProduct(product)}
              onRemove={() => onRemoveProduct(product.id)}
              onUpdatePrice={(price) => onUpdatePrice(product.id, price)}
            />
          ))}
        </div>
      </div>

      {/* Right Panel - Chart */}
      <div className="lg:col-span-2">
        {selectedProduct ? (
          <PriceChart product={selectedProduct} />
        ) : (
          <Card className="bg-card border-border p-8 h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-muted-foreground mb-2">Select a product to view price history</div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
