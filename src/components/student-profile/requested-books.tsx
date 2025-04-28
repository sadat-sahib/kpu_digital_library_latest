
import React from "react"
import { Card, CardContent } from "../ui/card"
import { BookCard } from "./book-card"
import { Book } from "./tabs-books"


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
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                date={book.requestDate ?? ""}
                dateLabel="Requested on"
                image={book.image}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
