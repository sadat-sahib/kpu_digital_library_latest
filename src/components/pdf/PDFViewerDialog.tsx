import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "../ui/button";
import React from "react";

// تنظیم worker با استفاده از مسیر محلی
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerDialogProps {
  pdfUrl: string | null;
  title: string;
  onClose: () => void;
}

const PDFViewerDialog: React.FC<PDFViewerDialogProps> = ({ pdfUrl, title, onClose }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(window.innerWidth * 0.9);
  console.log('pdf url', pdfUrl)

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

  return (
    <Dialog open={!!pdfUrl} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-full mx-auto p-4">
        <div className="flex justify-between items-center w-full">
          <DialogTitle className="text-lg font-bold flex-1 text-center">{title}</DialogTitle>
          <Button onClick={onClose} variant="outline" className="ml-4">
            بستن
          </Button>
        </div>
        <div
          className="overflow-y-auto mt-4 w-full max-w-full px-2"
          style={{ maxHeight: "65vh", overflowX: "hidden" }}
        >
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.error("Error while loading PDF:", error)}
            className="w-full"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div key={`page_${index + 1}`} className="mb-4">
                <Page
                  pageNumber={index + 1}
                  className="mx-auto"
                  width={pageWidth} // تنظیم عرض صفحه
                />
              </div>
            ))}
          </Document>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFViewerDialog;
