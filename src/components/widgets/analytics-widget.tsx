"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { website: "google", hours: 12 },
  { website: "youtube", hours: 8 },
  { website: "github", hours: 6 },
  { website: "chatgpt", hours: 4 },
  { website: "other", hours: 3 },
]

const chartConfig = {
  hours: {
    label: "Hours",
  },
  google: {
    label: "Google",
    color: "hsl(var(--chart-1))",
  },
  youtube: {
    label: "YouTube",
    color: "hsl(var(--chart-2))",
  },
  github: {
    label: "GitHub",
    color: "hsl(var(--chart-3))",
  },
  chatgpt: {
    label: "ChatGPT",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function AnalyticsWidget() {
  return (
    <Card className="flex flex-col h-full bg-card/50 w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Website Usage (hrs)</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="hours"
              nameKey="website"
              innerRadius={50}
              strokeWidth={5}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="website" />}
              className="-translate-y-4 flex-wrap gap-2 [&>*]:basis-1/2 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
