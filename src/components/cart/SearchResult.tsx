import React, { useState } from 'react';
import { useSearchStore } from '../../Store/useSearchStore';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../ui/tooltip';
import { Download, Eye, FileText } from 'lucide-react';
import BookDetailsDialog from './BookDetailDialog';
import PDFViewerDialog from '../pdf/PDFViewerDialog';
import { useAuthStore } from '../../Store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../axiosInstance';
import Swal from 'sweetalert2';
import { useCartStore } from '../../Store/useCartStore';

interface Book {
  id: number;
  title: string;
  author: string;
  image_url: string;
  publicationYear: string;
  publisher: string;
  translator: string;
  description: string;
  format: "hard" | "soft";
}

const SearchResult: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [pdfTitle, setPdfTitle] = useState<string>('');

  const { filteredResults } = useSearchStore() as unknown as { filteredResults: Book[] };
   const { incrementCart } = useCartStore();

  console.log('filtered result',filteredResults)

  const openPdfDialog = (url: string, title: string) => {
    setPdfUrl(url);
    setPdfTitle(title);
    setPdfDialogOpen(true);
  };

  const closePdfDialog = () => {
    setPdfDialogOpen(false);
    setPdfUrl('');
    setPdfTitle('');
  };

  const handleDialog = (book: Book) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  // Mutation for adding a book to the cart
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  const { mutate: addToCart } = useMutation({
    mutationFn: async (id: number) => {
      await axios.post(
        `/api/cart/books/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "موفقیت",
        text: "کتاب به کارت اضافه شد!",
      });
      incrementCart()
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "اضافه کردن کتاب به کارت با خطا مواجه شد!",
      });
      queryClient.invalidateQueries({
        queryKey:["cartBooks"]
      });
      
    },
  });

  return (
    <TooltipProvider>
      {Array.isArray(filteredResults) && filteredResults.length > 0 && (
        <div className="container mx-auto p-4">
          <h2 className="text-xl font-bold mb-4 text-center">نتایج جستجو</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredResults.map((book: Book) => (
              <Card key={book.id} className="shadow-lg mx-auto w-[90%] sm:w-[150px] md:w-[180px] lg:w-[230px]">
                <div className="relative h-48 w-full overflow-hidden rounded-t-md">
                  <img src={book.image_url} alt={book.title} className="object-cover w-full h-full" />
                </div>
                <CardContent>
                  <div className="flex justify-between items-center py-2">
                    <Tooltip>
                      <TooltipTrigger className={`${book.format === 'hard' ? 'opacity-0':'opacity-100'}`}>
                        <Button variant="ghost" size="sm" disabled={book.format==="hard"?true:false}>
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
                      <TooltipTrigger className={`${book.format === 'hard' ? 'opacity-0':'opacity-100'}`}>
                        <Button variant="ghost" size="sm" onClick={() => openPdfDialog('/2.pdf', book.title)}
                          disabled={book.format==="hard" ? true : false}>
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
        </div>
      )}

      {openDialog && selectedBook && (
        <BookDetailsDialog
          open={openDialog}
          onClose={closeDialog}
          title={selectedBook.title}
          author={selectedBook.author}
          image={selectedBook.image_url}
          publicationYear={selectedBook.publicationYear}
          publisher={selectedBook.publisher}
          translator={selectedBook.translator}
          description={selectedBook.description}
        />
      )}

      {pdfDialogOpen && <PDFViewerDialog pdfUrl={pdfUrl} title={pdfTitle} onClose={closePdfDialog} />}
    </TooltipProvider>
  );
};

export default SearchResult;

