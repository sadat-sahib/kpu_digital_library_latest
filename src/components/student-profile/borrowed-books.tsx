import { Card, CardContent } from "../ui/card";

import React from "react";
import { BookCard } from "./book-card";
import { useGetProfileInfo } from "../../config/client/HomePgeApi.query";
import { Skeleton } from "../ui/skeleton";
import { Book } from "./tabs-books";

interface BorrowedBooksProps {
  books: Book[];
}

export function BorrowedBooks({ books }: BorrowedBooksProps) {
  const { data, isPending } = useGetProfileInfo();
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
  const UserBooks = data?.data.books ?? [];
  return (
    <Card className="border-none shadow-none  rounded-none  w-full">

      <CardContent>
        {UserBooks.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            هیج کتابی به امانت نگرفته اید.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {UserBooks.map((book, index) => (
              <BookCard
                key={index}
                title={book.book_title}
                author={book.book_author}
                date={book.reserve_date}
                dateLabel="Borrowed on"
                image={book.book_image}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
