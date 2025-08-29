import React from "react"
import { BorrowedBooks } from "./borrowed-books"
import { RequestedBooks } from "./requested-books"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

  
  export interface Book {
    // id: string
    // title: string
    // author: string
    // borrowDate?: string
    // requestDate?: string
    // image: string
      id: string
    book_author: string
    book_title: string
    book_image: string
    reserve_date?: string
    request_date?: string
    return_date?: string
  }
  
  interface TabsBooksProps {
    borrowedBooks: Book[]
    requestedBooks: Book[]
  }
  
  export function TabsBooks({ borrowedBooks, requestedBooks }: TabsBooksProps) {
    return (
      <div className="lg:col-span-2 w-full space-y-8 "> 
        <Tabs defaultValue="borrowed" className="w-full">
          <TabsList className="w-full justify-end mb-4">
            <TabsTrigger value="borrowed">کتاب‌های امانت گرفته شده</TabsTrigger>
            <TabsTrigger value="requested">کتاب‌های درخواست شده</TabsTrigger>
          </TabsList>
  
          <TabsContent value="borrowed" className="w-full h-[75vh] overflow-y-auto  space-y-4 scrollbar-hide">
            <BorrowedBooks books={borrowedBooks} />
          </TabsContent>
  
          <TabsContent value="requested" className="w-full h-[75vh] overflow-y-auto  space-y-4 scrollbar-hide" >
            <RequestedBooks books={requestedBooks} />
          </TabsContent>
        </Tabs>
      </div>
    )
  }
  
  