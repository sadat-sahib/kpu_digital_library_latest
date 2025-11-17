import { Card, CardContent } from "../ui/card";

import { BookCard } from "./ReserveBookCard";
import { usegetProfile} from "../../config/client/HomePgeApi.query";
import { Skeleton } from "../ui/skeleton";

interface BorrowBook {
  book_title: string,
  book_author: string,
  reserve_date: string,
  return_date: string,
  reserveLable: string,
  returnLabale: string,
  book_image: string
}

export function BorrowedBooks() {
  const {data:prof, isPending} = usegetProfile()
  if (isPending) {
    return (
      <div>
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="w-full h-48 rounded-xl" />
            ))}
        </div>
      </div>
    );
  }
  // const UserBooks = data?.data.books ?? [];
    const UserBooks = prof?.data.reserved_books ?? [];
  return (
    <Card className="border-none shadow-none  rounded-none  w-full">

      <CardContent>
        {UserBooks.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            هیج کتابی به امانت نگرفته اید.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {UserBooks.map((book:BorrowBook, index:number) => (
              <BookCard
                key={index}
                title={book.book_title}
                author={book.book_author}
                reserveDate={book.reserve_date}
                returnDate={book.return_date}
                reserveLabel="امانت گرفته شده در"
                returnLabel="برگشت در"
                image={book.book_image}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
