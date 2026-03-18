import type { CategorySlug } from "@/lib/types/question"

export interface Category {
  slug: CategorySlug
  name: string
  description: string
  icon: string
  weight: number
  sortOrder: number
}

export const CATEGORIES: Category[] = [
  {
    slug: "road-signs",
    name: "Road Signs",
    description: "Traffic signs, signals, and pavement markings",
    icon: "🛑",
    weight: 0.15,
    sortOrder: 1,
  },
  {
    slug: "right-of-way",
    name: "Right-of-Way",
    description: "Who goes first at intersections and crosswalks",
    icon: "🚦",
    weight: 0.15,
    sortOrder: 2,
  },
  {
    slug: "traffic-laws",
    name: "Traffic Laws",
    description: "Rules of the road, turns, lanes, and signals",
    icon: "📋",
    weight: 0.15,
    sortOrder: 3,
  },
  {
    slug: "speed-limits",
    name: "Speed Limits",
    description: "Speed zones, adjusting speed for conditions",
    icon: "⚡",
    weight: 0.10,
    sortOrder: 4,
  },
  {
    slug: "dui-drug-laws",
    name: "DUI/Drug Laws",
    description: "Blood alcohol limits, drug impairment, penalties",
    icon: "🚫",
    weight: 0.10,
    sortOrder: 5,
  },
  {
    slug: "safe-driving",
    name: "Safe Driving",
    description: "Following distance, weather, night driving, emergencies",
    icon: "🛡️",
    weight: 0.15,
    sortOrder: 6,
  },
  {
    slug: "parking",
    name: "Parking",
    description: "Parallel parking, curb colors, restricted zones",
    icon: "🅿️",
    weight: 0.10,
    sortOrder: 7,
  },
  {
    slug: "sharing-the-road",
    name: "Sharing the Road",
    description: "Pedestrians, cyclists, motorcycles, large vehicles",
    icon: "🚲",
    weight: 0.10,
    sortOrder: 8,
  },
]
