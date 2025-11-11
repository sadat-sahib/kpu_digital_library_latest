import { CalendarIcon } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import CustomImage from "../ui/custom-image/CustomImage"
import { toJalaliPersian } from "../../utils/dateUtils" 

interface BookCardProps {
  title: string
  author: string 
  reserveDate: string
  returnDate: string
  reserveLabel: string
  returnLabel: string
  image: string
}

export function BookCard({
  title,
  author,
  reserveDate,
  returnDate,
  reserveLabel,
  returnLabel,
  image,
}: BookCardProps) {
  const ReserveFormattedDate = toJalaliPersian(reserveDate) // Use Persian digits
  const ReturnFormattedDate = toJalaliPersian(returnDate) // Use Persian digits

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden rounded-t-md">
        <CustomImage
          src={image}
          alt={title}
          fallbackSrc="/no-image.png"
          width="100%"
          height="100%"
          className="object-cover w-full h-full"
          imgClassName="rounded-t-md"
        />
      </div>
      <CardContent className="flex flex-col flex-grow p-4 items-end">
        <h3 className="font-semibold line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{author}</p>

        <div className="mt-auto flex items-center text-xs gap-2 text-muted-foreground">
          <span className="flex items-center gap-1">
            {ReserveFormattedDate}
            <p className="text-sm font-serif"> :{reserveLabel}</p>
          </span>
          <CalendarIcon className="mr-1 h-3 w-3" />
        </div>

        <div className="mt-auto flex items-center text-xs gap-2 text-muted-foreground">
          <span className="flex items-center gap-1">
            {ReturnFormattedDate}
            <p className="text-sm font-serif"> :{returnLabel}</p>
          </span>
          <CalendarIcon className="mr-1 h-3 w-3" />
        </div>
      </CardContent>
    </Card>
  )
}