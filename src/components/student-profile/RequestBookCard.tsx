import { Clock } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import CustomImage from "../ui/custom-image/CustomImage";

interface BookCardProps {
  title: string;
  author: string;
  image: string;
}

export function RequestBookCard({
  title,
  author,
  image,
}: BookCardProps) {

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
        <span className="flex justify-center items-center gap-3">
            <p className="text-sm font-serif">در انتظار تایید و ثبت درخواست</p>
            <Clock className="mr-1 h-3 w-3 inline-block" />
        </span>
      </CardContent>
    </Card>
  );
}
