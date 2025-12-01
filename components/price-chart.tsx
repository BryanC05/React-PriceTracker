"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Product {
  id: number
  name: string
  currentPrice: number
  originalPrice: number
  targetPrice: number
  priceHistory: Array<{ date: string; price: number }>
}

interface PriceChartProps {
  product: Product
}

export function PriceChart({ product }: PriceChartProps) {
  const minPrice = Math.min(...product.priceHistory.map((p) => p.price)) * 0.95
  const maxPrice = Math.max(...product.priceHistory.map((p) => p.price)) * 1.05

  return (
    <Card className="bg-card border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-1">{product.name}</h2>
        <div className="flex items-baseline gap-3">
          <div className="text-3xl font-bold text-foreground">${product.currentPrice.toFixed(2)}</div>
          <div className="text-sm text-muted-foreground">Target: ${product.targetPrice.toFixed(2)}</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={product.priceHistory}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--color-primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--color-primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--color-muted-foreground))"
            style={{ fontSize: "12px" }}
            tick={{ fill: "hsl(var(--color-muted-foreground))" }}
          />
          <YAxis
            domain={[minPrice, maxPrice]}
            stroke="hsl(var(--color-muted-foreground))"
            style={{ fontSize: "12px" }}
            tick={{ fill: "hsl(var(--color-muted-foreground))" }}
            label={{ value: "Price ($)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--color-card))",
              border: "1px solid hsl(var(--color-border))",
              borderRadius: "8px",
              color: "hsl(var(--color-foreground))",
            }}
            formatter={(value: any) => `$${value.toFixed(2)}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="white"
            dot={{ fill: "black", r: 4 }}
            activeDot={{ r: 6 }}
            strokeWidth={2}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-secondary/20 rounded-lg p-3">
          <div className="text-xs text-muted-foreground mb-1">Highest Price</div>
          <div className="text-lg font-bold text-foreground">
            ${Math.max(...product.priceHistory.map((p) => p.price)).toFixed(2)}
          </div>
        </div>
        <div className="bg-secondary/20 rounded-lg p-3">
          <div className="text-xs text-muted-foreground mb-1">Lowest Price</div>
          <div className="text-lg font-bold text-foreground">
            ${Math.min(...product.priceHistory.map((p) => p.price)).toFixed(2)}
          </div>
        </div>
        <div className="bg-secondary/20 rounded-lg p-3">
          <div className="text-xs text-muted-foreground mb-1">Average Price</div>
          <div className="text-lg font-bold text-foreground">
            ${(product.priceHistory.reduce((sum, p) => sum + p.price, 0) / product.priceHistory.length).toFixed(2)}
          </div>
        </div>
      </div>
    </Card>
  )
}
