"use client"

import { LineChart, Line, ResponsiveContainer } from "recharts"

interface CategorySparklineProps {
  data: { value: number }[]
  color?: string
}

export function CategorySparkline({
  data,
  color = "var(--neon-cyan)",
}: CategorySparklineProps) {
  if (data.length < 2) return null

  return (
    <ResponsiveContainer width="100%" height={32}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
