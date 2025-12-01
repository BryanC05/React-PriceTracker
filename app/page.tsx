"use client"

import { useState } from "react"
import { Dashboard } from "@/components/dashboard"
import { AddProductModal } from "@/components/add-product-modal"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Sony WH-1000XM5 Headphones",
      url: "https://www.bestbuy.com/site/sony-wh-1000xm5",
      currentPrice: 398,
      originalPrice: 398,
      priceHistory: [
        { date: "2024-01-01", price: 399 },
        { date: "2024-01-08", price: 399 },
        { date: "2024-01-15", price: 379 },
        { date: "2024-01-22", price: 389 },
        { date: "2024-01-29", price: 378 },
        { date: "2024-02-05", price: 398 },
      ],
      targetPrice: 350,
      category: "Electronics",
      addedDate: "2024-01-01",
    },
    {
      id: 2,
      name: "Apple AirPods Pro (2nd Gen)",
      url: "https://www.apple.com/airpods-pro",
      currentPrice: 249,
      originalPrice: 249,
      priceHistory: [
        { date: "2024-01-01", price: 249 },
        { date: "2024-01-08", price: 229 },
        { date: "2024-01-15", price: 229 },
        { date: "2024-01-22", price: 249 },
        { date: "2024-01-29", price: 249 },
        { date: "2024-02-05", price: 249 },
      ],
      targetPrice: 199,
      category: "Electronics",
      addedDate: "2024-01-05",
    },
    {
      id: 3,
      name: 'MacBook Air M3 13"',
      url: "https://www.apple.com/macbook-air",
      currentPrice: 1199,
      originalPrice: 1199,
      priceHistory: [
        { date: "2024-01-01", price: 1299 },
        { date: "2024-01-08", price: 1249 },
        { date: "2024-01-15", price: 1199 },
        { date: "2024-01-22", price: 1199 },
        { date: "2024-01-29", price: 1149 },
        { date: "2024-02-05", price: 1199 },
      ],
      targetPrice: 1099,
      category: "Computers",
      addedDate: "2024-01-10",
    },
  ])

  const handleAddProduct = (newProduct: any) => {
    const product = {
      id: Math.max(...products.map((p) => p.id), 0) + 1,
      ...newProduct,
      currentPrice: newProduct.currentPrice,
      originalPrice: newProduct.currentPrice,
      priceHistory: [{ date: new Date().toISOString().split("T")[0], price: newProduct.currentPrice }],
      addedDate: new Date().toISOString().split("T")[0],
    }
    setProducts([...products, product])
    setIsModalOpen(false)
  }

  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const handleUpdatePrice = (id: number, newPrice: number) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? {
              ...p,
              currentPrice: newPrice,
              priceHistory: [...p.priceHistory, { date: new Date().toISOString().split("T")[0], price: newPrice }],
            }
          : p,
      ),
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Price Tracker</h1>
            <p className="text-muted-foreground">Monitor product prices and get alerts when they drop</p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            + Add Product
          </Button>
        </div>

        {/* Dashboard */}
        <Dashboard products={products} onRemoveProduct={handleRemoveProduct} onUpdatePrice={handleUpdatePrice} />

        {/* Add Product Modal */}
        <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddProduct} />
      </div>
    </main>
  )
}
