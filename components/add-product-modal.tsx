"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (product: any) => void
}

export function AddProductModal({ isOpen, onClose, onAdd }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    currentPrice: "",
    targetPrice: "",
    category: "Electronics",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.currentPrice || !formData.targetPrice) {
      alert("Please fill in all required fields")
      return
    }

    onAdd({
      name: formData.name,
      url: formData.url,
      currentPrice: Number.parseFloat(formData.currentPrice),
      targetPrice: Number.parseFloat(formData.targetPrice),
      category: formData.category,
    })

    setFormData({
      name: "",
      url: "",
      currentPrice: "",
      targetPrice: "",
      category: "Electronics",
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-card border-border w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Product Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-input border border-border px-3 py-2 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Sony WH-1000XM5 Headphones"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Product URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full bg-input border border-border px-3 py-2 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Current Price *</label>
              <div className="flex items-center">
                <span className="text-foreground mr-2">$</span>
                <input
                  type="number"
                  value={formData.currentPrice}
                  onChange={(e) => setFormData({ ...formData, currentPrice: e.target.value })}
                  className="flex-1 bg-input border border-border px-3 py-2 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Target Price *</label>
              <div className="flex items-center">
                <span className="text-foreground mr-2">$</span>
                <input
                  type="number"
                  value={formData.targetPrice}
                  onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                  className="flex-1 bg-input border border-border px-3 py-2 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-input border border-border px-3 py-2 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Electronics</option>
              <option>Computers</option>
              <option>Books</option>
              <option>Clothing</option>
              <option>Home & Garden</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              Add Product
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
