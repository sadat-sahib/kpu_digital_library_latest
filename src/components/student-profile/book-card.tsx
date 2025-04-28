
import { CalendarIcon } from "lucide-react"
import React from "react"
import { Card, CardContent } from "../ui/card"

interface BookCardProps {
  title: string
  author: string
  date: string
  dateLabel: string
  image: string
}

export function BookCard({ title, author, date, dateLabel, image }: BookCardProps) {
  // Format date to be more readable
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <img src={image || "/placeholder.svg"} alt={title} className="object-cover" />
      </div>
      <CardContent className="flex flex-col flex-grow p-4">
        <h3 className="font-semibold line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{author}</p>
        <div className="mt-auto flex items-center text-xs text-muted-foreground">
          <CalendarIcon className="mr-1 h-3 w-3" />
          <span>
            {dateLabel}: {formattedDate}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
