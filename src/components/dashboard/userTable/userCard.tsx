import React from 'react';
import axios from "../../../axiosInstance";
import { useEffect, useRef, useState } from "react";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
import { Loader } from "lucide-react";

interface Props {
  id: number | undefined;
  closeModal: () => void;
}
interface User {
  firstName: string;
  lastName: string;
  image: string | File;
  id: string;
  department: string;
  faculty: string;
  phone: string;
}

const UserCard = ({ closeModal, id }: Props) => {
  const { token } = useAdminAuthStore();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get(`/api/dashboard/users/activated_users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch user data");
        setLoading(false);
        console.log(error);
      });
  }, [id, token]);

  const handlePrint = () => {
    if (!cardRef.current) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Get the HTML of the card
    const cardHtml = cardRef.current.innerHTML;

    // Create a print-specific HTML document
    // printWindow.document.write(`
    //   <!DOCTYPE html>
    //   <html dir="rtl">
    //     <head>
    //       <title>کارت کتابخانه</title>
    //       <style>
    //         @page {
    //           size: 80mm 50mm landscape;
    //           margin: 0;
    //         }
    //         body {
    //           margin: 0;
    //           padding: 0;
    //           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    //           -webkit-print-color-adjust: exact !important;
    //           print-color-adjust: exact !important;
    //         }
    //         .print-card {
    //           width: 80mm;
    //           height: 50mm;
    //           background: linear-gradient(to bottom right, #3b82f6, #2563eb);
    //           color: white;
    //           padding: 16px;
    //           position: relative;
    //           overflow: hidden;
    //           box-sizing: border-box;
    //         }
    //         .university-header {
    //           position: absolute;
    //           top: 8px;
    //           right: 8px;
    //           left: 8px;
    //           display: flex;
    //           justify-content: space-between;
    //           align-items: center;
    //           font-size: 12px;
    //           font-weight: 600;
    //         }
    //         .logo {
    //           width: 32px;
    //           height: 32px;
    //           background: white;
    //           border-radius: 50%;
    //           display: flex;
    //           align-items: center;
    //           justify-content: center;
    //         }
    //         .logo-inner {
    //           width: 24px;
    //           height: 24px;
    //           background: #3b82f6;
    //           border-radius: 50%;
    //         }
    //         .watermark {
    //           position: absolute;
    //           opacity: 0.1;
    //           left: 110px;
    //           bottom: 100px;
    //           font-size: 48px;
    //           font-weight: bold;
    //         }
    //         .card-content {
    //           display: flex;
    //           height: 100%;
    //           padding-top: 40px;
    //         }
    //         .user-info {
    //           flex: 1;
    //           padding-left: 8px;
    //           font-size: 12px;
    //         }
    //         .user-info div {
    //           margin-bottom: 4px;
    //         }
    //         .photo-section {
    //           display: flex;
    //           flex-direction: column;
    //           align-items: center;
    //         }
    //         .photo {
    //           width: 80px;
    //           height: 96px;
    //           border: 2px solid white;
    //           border-radius: 2px;
    //           background: white;
    //           overflow: hidden;
    //           margin-bottom: 4px;
    //         }
    //         .photo img {
    //           width: 100%;
    //           height: 100%;
    //           object-fit: cover;
    //         }
    //         .signature {
    //           width: 80px;
    //           height: 24px;
    //           border-top: 1px solid white;
    //           text-align: center;
    //           font-size: 8px;
    //           padding-top: 2px;
    //         }
    //         .footer {
    //           position: absolute;
    //           bottom: 4px;
    //           right: 8px;
    //           left: 8px;
    //           text-align: center;
    //           font-size: 6px;
    //         }
    //         strong {
    //           margin-left: 4px;
    //         }
    //       </style>
    //     </head>
    //     <body>
    //       <div class="print-card">
    //         <div class="university-header">
    //           <div>پوهنتون پولی تخنیک</div>
    //           <div class="logo">
    //             <div class="logo-inner"></div>
    //           </div>
    //         </div>
            
    //         <div class="watermark">KPU</div>
            
    //         <div class="card-content">
    //           <div class="user-info">
    //             <div><strong style="padding-left:18px;">آی دی:</strong> ${user?.id}</div>
    //             <div><strong style="padding-left:34px;">نام:</strong> ${user?.firstName} ${user?.lastName}</div>
    //             <div><strong style="padding-left:9px;">پوهنځی:</strong> ${user?.faculty}</div>
    //             <div><strong style="padding-left:1px;">دیپارتمنت:</strong> ${user?.department}</div>
    //             ${user?.phone ? `<div><strong style="padding-left:1px;">نمبر تماس:</strong> ${user.phone}</div>` : ''}
    //           </div>
              
    //           <div class="photo-section">
    //             <div class="photo">
    //               <img src="${
    //                 typeof user?.image === "string"
    //                   ? user.image
    //                   : user?.image instanceof File
    //                   ? URL.createObjectURL(user.image)
    //                   : ""
    //               }" alt="عکس ${user?.firstName}" />
    //             </div>
    //             <div class="signature">امضا</div>
    //           </div>
    //         </div>
            
    //         <div class="footer">
    //           کارت کتابخانه - معتبر با کارت پوهنتون
    //         </div>
    //       </div>
    //     </body>
    //   </html>
    // `);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl">
        <head>
          <title>کارت کتابخانه</title>
          <style>
            @page {
              size: 80mm 50mm landscape;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .print-card {
              width: 80mm;
              height: 50mm;
              background: linear-gradient(to bottom right, #3b82f6, #2563eb);
              color: white;
              padding: 16px;
              position: relative;
              overflow: hidden;
              box-sizing: border-box;
            }
            .university-header {
              position: absolute;
              top: 8px;
              right: 8px;
              left: 8px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 12px;
              font-weight: 600;
            }
            .logo {
              width: 32px;
              height: 32px;
              background: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .logo-inner {
              width: 24px;
              height: 24px;
              background: #3b82f6;
              border-radius: 50%;
            }
            .watermark {
              position: absolute;
              opacity: 0.1;
              left: 110px;
              bottom: 100px;
              font-size: 48px;
              font-weight: bold;
            }
            .card-content {
              display: flex;
              height: 100%;
              padding-top: 40px;
            }
            .user-info {
              flex: 1;
              padding-left: 8px;
              font-size: 12px;
            }
            .user-info div {
              margin-bottom: 4px;
            }
            .photo-section {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .photo {
              width: 80px;
              height: 96px;
              border: 2px solid white;
              border-radius: 2px;
              background: white;
              overflow: hidden;
              margin-bottom: 4px;
            }
            .photo img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .signature {
              width: 80px;
              height: 24px;
              border-top: 1px solid white;
              text-align: center;
              font-size: 8px;
              padding-top: 2px;
            }
            .footer {
              position: absolute;
              bottom: 4px;
              right: 8px;
              left: 8px;
              text-align: center;
              font-size: 6px;
            }
            strong {
              margin-left: 4px;
            }
            .book-table {
              width: 100%;
              margin-top: 10px;
              border-collapse: collapse;
              font-size: 10px;
            }
            .book-table th {
              background-color: #f0f0f0;
              padding: 4px;
              border: 1px solid #ddd;
              text-align: center;
            }
            .book-table td {
              padding: 4px;
              border: 1px solid #ddd;
              height: 20px;
            }
            .table-title {
              font-size: 12px;
              font-weight: bold;
              margin-top: 8px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="print-card">
            <div class="university-header">
              <div>پوهنتون پولی تخنیک</div>
              <div class="logo">
                <div class="logo-inner"></div>
              </div>
            </div>
            
            <div class="watermark">KPU</div>
            
            <div class="card-content">
              <div class="user-info">
                <div><strong style="padding-left:18px;">آی دی:</strong> ${user?.id}</div>
                <div><strong style="padding-left:34px;">نام:</strong> ${user?.firstName} ${user?.lastName}</div>
                <div><strong style="padding-left:9px;">پوهنځی:</strong> ${user?.faculty}</div>
                <div><strong style="padding-left:1px;">دیپارتمنت:</strong> ${user?.department}</div>
                ${user?.phone ? `<div><strong style="padding-left:1px;">نمبر تماس:</strong> ${user.phone}</div>` : ''}
              </div>
              
              <div class="photo-section">
                <div class="photo">
                  <img src="${
                    typeof user?.image === "string"
                      ? user.image
                      : user?.image instanceof File
                      ? URL.createObjectURL(user.image)
                      : ""
                  }" alt="عکس ${user?.firstName}" />
                </div>
                <div class="signature">امضا</div>
              </div>
            </div>
            
            <div class="footer">
              کارت کتابخانه - معتبر با کارت پوهنتون
            </div>
          </div>
          
          <div class="table-title">لیست کتابهای امانت گرفته شده</div>
          <table class="book-table">
            <thead>
              <tr>
                <th>شماره</th>
                <th>نام کتاب</th>
                <th>تاریخ امانت</th>
                <th>تاریخ برگشت</th>
                <th>امضا</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    
    // Wait for content to load before printing
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    };
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={32} className="animate-spin text-blue-600" />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-30 p-4">
      {user && (
        <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
          <h1 className="text-center text-2xl font-bold mb-6 text-gray-800">
            کارت کتابخانه
          </h1>
          
          {/* Printable Card */}
          <div
            ref={cardRef}
            className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md w-full max-w-xs h-48 p-4 text-white overflow-hidden"
            dir="rtl"
          >
            {/* University Logo/Header */}
            <div className="absolute top-2 right-2 left-2 flex justify-between items-center">
              <div className="text-xs font-semibold">پوهنتون پولی تخنیک</div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            
            {/* Watermark */}
            <div className="absolute opacity-10 left-24 bottom-18">
              <div className="text-6xl font-bold">KPU</div>
            </div>
            
            {/* Card Content */}
            <div className="flex h-full pt-10">
              {/* User Info */}
              <div className="flex-1 pl-2">
                <div className="text-xs mb-1">
                  <span className="font-semibold pl-5">آی دی:</span> {user.id}
                </div>
                <div className="text-xs mb-1">
                  <span className="font-semibold pl-9">نام:</span> {user.firstName} {user.lastName}
                </div>
                <div className="text-xs mb-1">
                  <span className="font-semibold pl-4">پوهنځی:</span> {user.faculty}
                </div>
                <div className="text-xs mb-1">
                  <span className="font-semibold pl-2">دیپارتمنت:</span> {user.department}
                </div>
                {user.phone && (
                  <div className="text-xs">
                    <span className="font-semibold pl-1"> نمبر تماس:</span> {user.phone}
                  </div>
                )}
              </div>
              
              {/* Photo and Signature */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-24 border-2 border-white rounded-sm bg-white overflow-hidden mb-1">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      typeof user.image === "string"
                        ? user.image
                        : user.image instanceof File
                        ? URL.createObjectURL(user.image)
                        : ""
                    }
                    alt={`عکس ${user.firstName}`}
                  />
                </div>
                <div className="w-20 h-6 border-t border-white text-center text-[8px] pt-0.5">
                  امضا
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-1 right-2 left-2 text-[6px] text-center">
              کارت کتابخانه - معتبر با کارت پوهنتون
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between w-full max-w-xs mt-6">
            <button
              onClick={closeModal}
              className="py-2 px-6 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-md"
            >
              بستن
            </button>
            <button
              onClick={handlePrint}
              className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
            >
              چاپ کارت
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;