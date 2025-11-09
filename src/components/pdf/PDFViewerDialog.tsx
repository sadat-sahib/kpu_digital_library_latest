import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "../ui/button";

// Import the required CSS styles
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// تنظیم worker با استفاده از مسیر محلی
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerDialogProps {
  pdfUrl: string | null;
  title: string;
  onClose: () => void;
}

const PDFViewerDialog = ({
  pdfUrl,
  title,
  onClose,
}:PDFViewerDialogProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageWidth, setPageWidth] = useState<number>(window.innerWidth * 0.9);

  // تنظیم مقیاس صفحه در صورت تغییر اندازه پنجره
  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth * 0.9); // 90% از عرض صفحه نمایش
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages || 1));
  };

  return (
    <Dialog open={!!pdfUrl} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-full mx-auto p-4">
        <div className="flex justify-between items-center w-full">
          <DialogTitle className="text-lg font-bold flex-1 text-center">
            {title}
          </DialogTitle>
          <Button onClick={onClose} variant="outline" className="ml-4">
            بستن
          </Button>
        </div>

        {/* Page navigation controls */}
        {numPages && numPages > 1 && (
          <div className="flex justify-center items-center my-4">
            <Button
              onClick={goToPreviousPage}
              disabled={pageNumber <= 1}
              variant="outline"
              className="mx-2"
            >
              قبلی
            </Button>
            <span className="mx-4">
              صفحه {pageNumber} از {numPages}
            </span>
            <Button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              variant="outline"
              className="mx-2"
            >
              بعدی
            </Button>
          </div>
        )}

        <div
          className="overflow-y-auto mt-4 w-full max-w-full px-2"
          style={{ maxHeight: "65vh", overflowX: "hidden" }}
        >
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) =>
              console.error("Error while loading PDF:", error)
            }
            className="w-full"
            loading={
              <div className="text-center py-8">در حال بارگذاری PDF...</div>
            }
            error={
              <div className="text-center py-8 text-red-500">
                خطا در بارگذاری PDF
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              className="mx-auto"
              width={pageWidth}
              loading={
                <div className="text-center py-8">در حال بارگذاری صفحه...</div>
              }
            />
          </Document>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFViewerDialog;
