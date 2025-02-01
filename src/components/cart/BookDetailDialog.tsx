import { Dialog, DialogContent, DialogFooter, DialogOverlay} from '../ui/dialog'; // وارد کردن کامپوننت‌های مورد نیاز از shadcn/ui


interface BookDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  author: string;
  image: string;
  publicationYear: string;
  publisher: string;
  translator: string;
  description:string;
}

const BookDetailsDialog = ({
  open,
  onClose,
  title,
  author,
  image,
  publicationYear,
  publisher,
  translator,
  description,
}: BookDialogProps) => {


  return (
    <Dialog open={open} onOpenChange={onClose} >
            <DialogOverlay />
      <DialogContent className=''>
        
        

        <div className="flex flex-col md:flex-row gap-4">
          {/* تصویر کتاب */}
          <div className="flex-none w-full md:w-1/3 h-48 overflow-hidden rounded-md">
            <img src={image} alt={title} className="object-cover w-full h-full" />
          </div>

          {/* جزئیات کتاب */}
          <div className="flex flex-col justify-between w-full md:w-2/3">
            <p className="text-sm text-gray-600">نویسنده: {author}</p>
            <p className="text-sm text-gray-600">سال انتشار: {publicationYear}</p>
            <p className="text-sm text-gray-600">ناشر: {publisher}</p>
            <p className="text-sm text-gray-600">مترجم: {translator}</p>
            <p className="text-sm text-gray-600">توضیحات: {description}</p>

 
          </div>
        </div>

        <DialogFooter className='flex justify-center gap-3 items-center'>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
 export default BookDetailsDialog


