// import Swal from "sweetalert2";
// import { Card, CardContent } from "../ui/card";
// import { Button } from "../ui/button";
// import { Download, Eye, FileText, Loader2 } from "lucide-react";
// import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../ui/tooltip";
// import { Fragment, useState } from "react";
// import BookDetailsDialog from "./BookDetailDialog";
// import PDFViewerDialog from "../pdf/PDFViewerDialog";
// import axios from "../../axiosInstance";
// import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useAuthStore } from "../../Store/useAuthStore";
// import {useCartStore } from "../../Store/useCartStore"
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/autoplay";

// interface Book {
//   id: number;
//   title: string;
//   author: string;
//   image: string;
//   publicationYear: string;
//   publisher: string;
//   translator: string;
//   description:string;
//   format: "hard" | "soft";
// }

// interface Category {
//   id: number;
//   name: string;
// }



  
// export default function BookCategories() {
//   const [openDialog, setOpenDialog] = useState<boolean>(false);
//   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
//   const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  

//   // pdf functionality
//   const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
//   const [pdfTitle, setPdfTitle] = useState<string>("");

//   const { incrementCart } = useCartStore();
 

  
//   // Fetch categories
//   const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
//     queryKey: ["categories"],
//     queryFn: async () => {
//       const res = await axios.get("/api/home");
//       return res.data.categories_with_books;
//     },
//   });

//   // Fetch books for each category
//   const booksQueries = useQueries({
//     queries:
//       categories.map((category: Category) => ({
//         queryKey: ["books", category.id],
//         queryFn: async () => {
//           const res = await axios.get(
//             `/api/categories/books/${category.id}`
//           );
//           console.log("books data home",res.data.data.books.data)
//           return { categoryId: category.id, books: res.data.data.books.data };
//         },
        
//         enabled: !!categories.length,
        
//       })) || [],
      
//     });

//   const booksByCategory = booksQueries.reduce((acc, query) => {
//     if (query.data) {
//       acc[query.data.categoryId] = query.data.books;
//     }
//     return acc;
//   }, {} as { [key: number]: Book[] });
  
//   const openPdfDialog = (url: string , title: string) => {
//     setPdfUrl(url);
//     setPdfTitle(title);
//     setPdfDialogOpen(true);
//   };

//   const closePdfDialog = () => {
//     setPdfDialogOpen(false);
//     setPdfUrl(null);
//     setPdfTitle("");
//   };

//   const handleDialog = (book: Book) => {
//     setSelectedBook(book);
//     setOpenDialog(true);
//   };

//   const closeDialog = () => {
//     setOpenDialog(false);
//   };

//   const toggleCategory = (categoryId: number) => {
//     setExpandedCategories((prev) =>
//       prev.includes(categoryId)
//         ? prev.filter((id) => id !== categoryId)
//         : [...prev, categoryId]
//     );
//   };

//   // Mutation for adding a book to the cart
//   const { token } = useAuthStore();
//   const queryClient = useQueryClient();
//   const { mutate: addToCart } = useMutation({
//     mutationFn: async (id: number) => {
//       await axios.post(
//         `/api/cart/books/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     },
//     onSuccess: () => {
//       Swal.fire({
//         icon: "success",
//         title: "اضافه شد",
//         text: "کتاب به کارت اضافه شد!",
//         confirmButtonText:"بستن"
//       });
//       incrementCart()
//     },
//     onError: () => {
//       Swal.fire({
//         icon: "error",
//         title: "خطا",
//         text: "اضافه کردن کتاب به کارت با خطا مواجه شد!",
//         confirmButtonText:"بستن"
//       });
//       queryClient.invalidateQueries({
//         queryKey:["cartBooks"]
//       });
      
//     },
//   });



//   return (
//     <TooltipProvider>
//       <div className="space-y-8">
//         {categoriesLoading ? (
//           <div className="flex justify-center items-center space-x-2">
//             <Loader2 className="animate-spin" size={24} />
//             <span>در حال بارگذاری...</span>
//           </div>
//         ) : (
//           categories.map((category) => {
//             const isExpanded = expandedCategories.includes(category.id);
//             const books = booksByCategory[category.id] || [];
//             return (
//               <div key={category.id} className="relative w-full">
//                 <div className="flex justify-between items-center mb-4 px-2">
//                   <Button onClick={() => toggleCategory(category.id)} variant="outline">
//                     {isExpanded ? "نمایش کمتر" : "نمایش بیشتر"}
//                   </Button>
//                   <h2 className="text-lg font-bold">{category.name}</h2>
//                 </div>
//                 {isExpanded ? (
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                     {books.map((book) => (
//                       <Card key={book.id} className="shadow-lg mx-auto w-[90%] sm:w-[150px] md:w-[180px] lg:w-[230px]">
//                         <div className="relative h-48 w-full overflow-hidden rounded-t-md">
//                           <img
//                             src={book.image}
//                             alt={book.title}
//                             className="object-cover w-full h-full"
//                           />
//                         </div>
//                         <CardContent>
                          
//                           <div className="flex justify-between items-center py-2">
//                             <Tooltip>
//                               <TooltipTrigger>
//                                 <Button variant="ghost" size="sm" disabled={book.format==="hard"?true:false}>
//                                   <Download size={16} />
//                                 </Button>
//                               </TooltipTrigger>
//                               <TooltipContent>
                                
//                                 <p>دانلود</p>
//                               </TooltipContent>
//                             </Tooltip>
//                             <Tooltip>
//                               <TooltipTrigger>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => handleDialog(book)}
//                                 >
//                                   <Eye size={16} />
//                                 </Button>
//                               </TooltipTrigger>
//                               <TooltipContent>
//                                 <p>جزییات</p>
//                               </TooltipContent>
//                             </Tooltip>
//                             <Tooltip>
//                               <TooltipTrigger>
                                
//                                 <Button  variant="ghost" size="sm" onClick={() => openPdfDialog("/2.pdf", book.title)}
//                                   disabled={book.format==="hard"?true:false}>
//                                   <FileText size={16} />
//                                 </Button>
//                               </TooltipTrigger>
                              
//                               <TooltipContent>
//                                 <p>خواندن</p>
//                               </TooltipContent>
//                             </Tooltip>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-semibold text-gray-800">{book.title}</h3>
//                             <p className="text-xs text-gray-500">نویسنده : {book.author}</p>
//                           </div>
//                           <Button className="w-full mt-4 text-xs" variant="outline"
//                           onClick={() => addToCart(book.id)}>
//                             افزودن به کارت
//                           </Button>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 ) : (
//                     <Fragment>
//                       <Swiper
//                         spaceBetween={10}
//                         breakpoints={{
//                           320: { slidesPerView: 1 }, // موبایل
//                           640: { slidesPerView: 2 }, // تبلت کوچک
//                           768: { slidesPerView: 3 }, // تبلت بزرگ
//                           1024: { slidesPerView: 4 }, // لپ‌تاپ
//                           1280: { slidesPerView: 5 }, // دسکتاپ
//                         }}
//                         modules={[Autoplay]}
//                         loop={true}
//                         autoplay={{delay:2000}}
//                         className="mySwiper"
//                       >
//                         {books.map((book) => (
//                           <SwiperSlide key={book.id}>
//                             <Card className="shadow-lg mx-auto w-[90%] sm:w-[150px] md:w-[180px] lg:w-[230px]">
//                               <div className="relative h-48 w-full overflow-hidden rounded-t-md">
//                                 <img src={book.image} alt={book.title} className="object-cover w-full h-full" />
//                               </div>
//                               <CardContent>
//                                 <div className="flex justify-between items-center py-2">
//                                   <Tooltip>
//                                     <TooltipTrigger>
//                                       <Button variant="ghost" size="sm" disabled={book.format==="hard"?true:false}>
//                                         <Download size={16} />
//                                       </Button>
//                                     </TooltipTrigger>
//                                     <TooltipContent>
//                                       <p>دانلود</p>
//                                     </TooltipContent>
//                                   </Tooltip>
//                                   <Tooltip>
//                                     <TooltipTrigger>
//                                       <Button variant="ghost" size="sm" onClick={() => handleDialog(book)}>
//                                         <Eye size={16} />
//                                       </Button>
//                                     </TooltipTrigger>
//                                     <TooltipContent>
//                                       <p>جزییات</p>
//                                     </TooltipContent>
//                                   </Tooltip>
//                                   <Tooltip>
//                                     <TooltipTrigger>
//                                       <Button variant="ghost" size="sm" onClick={() => openPdfDialog("/2.pdf", book.title)}
//                                         disabled={book.format==="hard"?true:false}>
//                                         <FileText size={16} />
//                                       </Button>
//                                     </TooltipTrigger>
//                                     <TooltipContent>
//                                       <p>خواندن</p>
//                                     </TooltipContent>
//                                   </Tooltip>
//                                 </div>
//                                 <div>
//                                   <h3 className="text-sm font-semibold text-gray-800">{book.title}</h3>
//                                   <p className="text-xs text-gray-500">نویسنده : {book.author}</p>
//                                 </div>
//                                 <Button className="w-full mt-4 text-xs" variant="outline" onClick={() => addToCart(book.id)}>
//                                   افزودن به کارت
//                                 </Button>
//                               </CardContent>
//                             </Card>
//                           </SwiperSlide>
//                         ))}
//                       </Swiper>
//                     </Fragment>

//                 )}

//                 {/* dialog */}
//                 {openDialog && selectedBook && (
//                   <BookDetailsDialog
//                     open={openDialog}
//                     onClose={closeDialog}
//                     title={selectedBook.title}
//                     author={selectedBook.author}
//                     image={selectedBook.image}
//                     publicationYear={selectedBook.publicationYear}
//                     publisher={selectedBook.publisher}
//                     translator={selectedBook.translator}
//                     description={selectedBook.description}
//                   />
//                 )}
//                 {/* pdf */}
//                 {pdfDialogOpen && (
//                   <PDFViewerDialog
//                     pdfUrl={pdfUrl}
//                     title={pdfTitle}
//                     onClose={closePdfDialog}
//                   />
//                 )}
//               </div>
//             );
//           })
//         )}
//       </div>
//     </TooltipProvider>
//   );
// }



import Swal from "sweetalert2";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Download, Eye, FileText, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../ui/tooltip";
import {  useState, useRef } from "react";
import BookDetailsDialog from "./BookDetailDialog";
import PDFViewerDialog from "../pdf/PDFViewerDialog";
import axios from "../../axiosInstance";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../Store/useAuthStore";
import { useCartStore } from "../../Store/useCartStore";
import React from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  publicationYear: string;
  publisher: string;
  translator: string;
  description: string;
  pdf: string,
  format: "hard" | "soft";
}

interface Category {
  id: number;
  name: string;
}

export default function BookCategories() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  // PDF functionality
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string>("");

  const { incrementCart } = useCartStore();

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("/api/home");
      console.log('categories', res.data.categories_with_books[0].books)
      return res.data.categories_with_books;
    },
  });

  // Fetch books for each category
  const booksQueries = useQueries({
    queries: categories.map((category: Category) => ({
      queryKey: ["books", category.id],
      queryFn: async () => {
        const res = await axios.get(`/api/categories/books/${category.id}`);
        console.log('books data', res.data.data.books.data)
        return { categoryId: category.id, books: res.data.data.books.data };
      },
      enabled: !!categories.length,
    })),
  });

  const booksByCategory = booksQueries.reduce((acc, query) => {
    if (query.data) {
      acc[query.data.categoryId] = query.data.books;
    }
    return acc;
  }, {} as { [key: number]: Book[] });

  const openPdfDialog = (url: string, title: string) => {
    setPdfUrl(url);
    setPdfTitle(title);
    setPdfDialogOpen(true);
  };

  const closePdfDialog = () => {
    setPdfDialogOpen(false);
    setPdfUrl(null);
    setPdfTitle("");
  };

  const handleDialog = (book: Book) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Mutation for adding a book to the cart
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  const { mutate: addToCart } = useMutation({
    mutationFn: async (id: number) => {
      await axios.post(`/api/cart/books/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "اضافه شد",
        text: "کتاب به کارت اضافه شد!",
        confirmButtonText: "بستن",
      });
      incrementCart();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "اضافه کردن کتاب به کارت با خطا مواجه شد!",
        confirmButtonText: "بستن",
      });
      queryClient.invalidateQueries({
        queryKey: ["cartBooks"],
      });
    },
  });

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const goNext = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const firstBook = slider.querySelector(".book-card") as HTMLElement;
  
      if (firstBook) {
        const bookWidth = firstBook.offsetWidth;
        const currentScrollPosition = slider.scrollLeft;
        const maxScrollPosition = slider.scrollWidth - slider.clientWidth;
  
        if (currentScrollPosition < maxScrollPosition) {
          slider.scrollLeft += bookWidth; // اینجا از scrollLeft استفاده شده است.
        }
      }
    }
  };
  
  const goPrev = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const firstBook = slider.querySelector(".book-card") as HTMLElement;
  
      if (firstBook) {
        const bookWidth = firstBook.offsetWidth;
        const currentScrollPosition = slider.scrollLeft;
  
        if (currentScrollPosition > 0) {
          slider.scrollLeft -= bookWidth; // اینجا از scrollLeft استفاده شده است.
        }
      }
    }
  };
  

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {categoriesLoading ? (
          <div className="flex justify-center items-center space-x-2">
            <Loader2 className="animate-spin" size={24} />
            <span>در حال بارگذاری...</span>
          </div>
        ) : (
          categories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id);
            const books = booksByCategory[category.id] || [];
            return (
              <div key={category.id} className="relative w-full">
                <div className="flex justify-between items-center mb-4 px-2">
                  <Button onClick={() => toggleCategory(category.id)} variant="outline">
                    {isExpanded ? "نمایش کمتر" : "نمایش بیشتر"}
                  </Button>
                  <h2 className="text-lg font-bold">{category.name}</h2>
                </div>
                {isExpanded ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {books.map((book) => (
                      <Card key={book.id} className="book-card shadow-lg mx-auto w-[90%] sm:w-[150px] md:w-[180px] lg:w-[230px]">
                        <div className="relative h-48 w-full overflow-hidden rounded-t-md">
                          <img src={book.image} alt={book.title} className="object-cover w-full h-full" />
                        </div>
                        <CardContent>
                          <div className="flex justify-between items-center py-2">
                            <Tooltip>
                              <TooltipTrigger>
                                <Button variant="ghost" size="sm" disabled={book.format === "hard" ? true : false}>
                                  <Download size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>دانلود</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button variant="ghost" size="sm" onClick={() => handleDialog(book)}>
                                  <Eye size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>جزییات</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button variant="ghost" size="sm" onClick={() => openPdfDialog(book.pdf, book.title)} disabled={book.format === "hard" ? true : false}>
                                  <FileText size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>خواندن</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-800">{book.title}</h3>
                            <p className="text-xs text-gray-500">نویسنده : {book.author}</p>
                          </div>
                          <Button className="w-full mt-4 text-xs" variant="outline" onClick={() => addToCart(book.id)}>
                            افزودن به کارت
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="relative ">
                    <div ref={sliderRef} className="flex overflow-x-auto space-x-4 gap-4 scrollbar-thin">
                      {books.map((book) => (
                        <Card key={book.id} className="book-card shadow-lg mx-auto w-[90%] sm:w-[150px] md:w-[180px] lg:w-[230px] flex-shrink-0">
                          <div className="relative h-48 w-full overflow-hidden rounded-t-md">
                            <img src={book.image} alt={book.title} className="object-cover w-full h-full" />
                          </div>
                          <CardContent>
                            <div className="flex justify-between items-center py-2">
                              <Tooltip>
                                <TooltipTrigger>
                                  <Button variant="ghost" size="sm" disabled={book.format === "hard" ? true : false}>
                                    <Download size={16} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>دانلود</p>
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Button variant="ghost" size="sm" onClick={() => handleDialog(book)}>
                                    <Eye size={16} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>جزییات</p>
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Button variant="ghost" size="sm" onClick={() => openPdfDialog(book.pdf, book.title)} disabled={book.format === "hard" ? true : false}>
                                    <FileText size={16} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>خواندن</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-gray-800">{book.title}</h3>
                              <p className="text-xs text-gray-500">نویسنده : {book.author}</p>
                            </div>
                            <Button className="w-full mt-4 text-xs" variant="outline" onClick={() => addToCart(book.id)}>
                              افزودن به کارت
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
                      <Button onClick={goPrev} variant="ghost">{"<"}</Button>
                    </div>
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
                      <Button onClick={goNext} variant="ghost">{">"}</Button>
                    </div>
                  </div>
                )}

                {/* Dialog */}
                {openDialog && selectedBook && (
                  <BookDetailsDialog
                    open={openDialog}
                    onClose={closeDialog}
                    title={selectedBook.title}
                    author={selectedBook.author}
                    image={selectedBook.image}
                    publicationYear={selectedBook.publicationYear}
                    publisher={selectedBook.publisher}
                    translator={selectedBook.translator}
                    description={selectedBook.description}
                  />
                )}

                {/* PDF Viewer */}
                {pdfDialogOpen && (
                  <PDFViewerDialog pdfUrl={pdfUrl} title={pdfTitle} onClose={closePdfDialog} />
                )}
              </div>
            );
          })
        )}
      </div>
    </TooltipProvider>
  );
}
