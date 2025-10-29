// src/components/.../returnModal.tsx
import React, { useState } from "react"
import { XIcon, CalendarIcon } from "lucide-react"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import { toISO } from "../../../utils/dateUtils"
import { dariLocale } from "../../../utils/dariLocale"

interface ReturnDateModalProps {
  closeModal: () => void
  onSubmit: (returnDate: string) => void
}

const ReturnModal: React.FC<ReturnDateModalProps> = ({ closeModal, onSubmit }) => {
  const [returnDate, setReturnDate] = useState<any>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!returnDate) {
      setError("لطفاً تاریخ بازگشت را انتخاب کنید")
      return
    }

    try {
      const isoDate = toISO(returnDate)
      onSubmit(isoDate)
      closeModal()
    } catch (err) {
      setError("خطا در تبدیل تاریخ. لطفاً دوباره تلاش کنید")
    }
  }

  const handleCancel = () => {
    setReturnDate("")
    setError("")
    closeModal()
  }

  // Set minimum date to today
  const today = new Date()
  const minDate = new Date()
  minDate.setHours(0, 0, 0, 0)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      dir="rtl"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">تعیین تاریخ بازگشت</h2>
          <button 
            onClick={handleCancel} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تاریخ بازگشت کتاب
            </label>
            <div className="relative">
              <DatePicker
                value={returnDate}
                onChange={(date) => {
                  setReturnDate(date)
                  setError("")
                }}
                calendar={persian}
                locale={dariLocale}
                minDate={minDate}
                format="YYYY/MM/DD"
                containerClassName="w-full"
                inputClass="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md text-right bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="تاریخ بازگشت را انتخاب کنید"
                calendarPosition="top-right"
              />
              <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
          </div>

          {/* Selected Date Preview */}
          {/* {returnDate && (
            <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200">
              <p className="text-sm text-blue-700">
                <span className="font-medium">تاریخ انتخابی:</span>{" "}
                {returnDate.format ? returnDate.format("YYYY/MM/DD") : returnDate.toString()}
              </p>
            </div>
          )} */}

          {/* Buttons */}
          <div className="flex justify-start space-x-4 space-x-reverse">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
              disabled={!returnDate}
            >
              ثبت تاریخ
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReturnModal