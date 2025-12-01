"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"

interface Product {
  id: number
  name: string
  currentPrice: number
  originalPrice: number
  targetPrice: number
  priceHistory: Array<{ date: string; price: number }>
}

interface ProductCardProps {
  product: Product
  isSelected: boolean
  onSelect: () => void
  onRemove: () => void
  onUpdatePrice: (price: number) => void
}

export function ProductCard({ product, isSelected, onSelect, onRemove, onUpdatePrice }: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [newPrice, setNewPrice] = useState(product.currentPrice.toString())

  const priceChange = product.currentPrice - product.originalPrice
  const percentChange = (priceChange / product.originalPrice) * 100
  const isTargetMet = product.currentPrice <= product.targetPrice
  const isSaved = product.currentPrice < product.originalPrice

  const handleUpdatePrice = () => {
    const price = Number.parseFloat(newPrice)
    if (!isNaN(price) && price > 0) {
      onUpdatePrice(price)
      setIsEditing(false)
    }
  }

  return (
    <Card
      onClick={onSelect}
      className={`bg-card border-border p-4 cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-accent border-accent" : "hover:border-accent/50"
      }`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 flex-1">{product.name}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex items-end justify-between gap-2">
          {isEditing ? (
            <div className="flex-1 flex gap-1">
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="flex-1 bg-input border border-border px-2 py-1 text-sm rounded text-foreground"
                step="0.01"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleUpdatePrice()
                }}
                className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90"
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <div>
                <div className="text-lg font-bold text-foreground">${product.currentPrice.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">was ${product.originalPrice.toFixed(2)}</div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsEditing(true)
                }}
                className="text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                edit
              </button>
            </>
          )}
        </div>

        {priceChange !== 0 && (
          <div className={`text-xs font-medium ${isSaved ? "text-accent" : "text-destructive"}`}>
            {isSaved ? "↓" : "↑"} {Math.abs(percentChange).toFixed(1)}% {isSaved ? "saved" : "increase"}
          </div>
        )}

        {isTargetMet && (
          <div className="text-xs px-2 py-1 bg-accent/10 text-accent rounded w-fit">Target reached! 🎉</div>
        )}

        <div className="text-xs text-muted-foreground">Target: ${product.targetPrice.toFixed(2)}</div>
      </div>
    </Card>
  )
}
