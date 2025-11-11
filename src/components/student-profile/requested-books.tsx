
import { Card, CardContent } from "../ui/card"
import { Book } from "./tabs-books"
import { RequestBookCard } from "./RequestBookCard"


interface RequestedBooksProps {
  books: Book[]
}

export function RequestedBooks({ books }: RequestedBooksProps) {
  return (
    <Card className="border-none shadow-none  w-full">
      <CardContent>
        {books.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">هیج کتابی درخواست نکرده اید </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {books.map((book) => (
              <RequestBookCard
                key={book.id}
                title={book.book_title}
                author={book.book_author}
                image={book.book_image}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
