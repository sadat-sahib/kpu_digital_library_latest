// src/utils/dateUtils.ts
import * as jalaali from "jalaali-js"

/**
 * ✅ Converts a Jalali date (from DateObject or string) to ISO (Gregorian)
 * Example input:
 *   - "1404/08/12"
 *   - DateObject from react-multi-date-picker
 * Output:
 *   - "2025-10-30T00:00:00.000Z"
 */
export const toISO = (jalaliDate: any): string => {
  if (!jalaliDate) return ""

  // 1️⃣ If it's a DateObject from react-multi-date-picker
  if (jalaliDate?.toDate && jalaliDate?.calendar) {
    const date = jalaliDate.toDate()
    return date.toISOString()
  }

  // 2️⃣ If it's a string like "1404/08/12" or "1404-08-12"
  if (typeof jalaliDate === "string") {
    const normalized = jalaliDate.replace(/-/g, "/")
    const [jy, jm, jd] = normalized.split("/").map(Number)
    if (!jy || !jm || !jd) return ""
    const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd)
    const gregorian = new Date(gy, gm - 1, gd)
    return gregorian.toISOString()
  }

  return ""
}

/**
 * ✅ Converts ISO (Gregorian) → Jalali (formatted "YYYY/MM/DD")
 * Example:
 *   Input: "2025-10-30T00:00:00.000Z"
 *   Output: "1404/08/08"
 */
export const toJalali = (isoDate: string): string => {
  if (!isoDate) return ""
  const date = new Date(isoDate)
  const { jy, jm, jd } = jalaali.toJalaali(date)
  return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`
}

/**
 * ✅ Converts Jalali (YYYY/MM/DD) → Gregorian "YYYY-MM-DD"
 * Useful for filters or backend query params (?from=2025-10-01)
 */
export const toISODate = (jalaliDate: any): string => {
  if (!jalaliDate) return ""
  const normalized =
    typeof jalaliDate === "string" ? jalaliDate.replace(/-/g, "/") : jalaliDate.format("YYYY/MM/DD")

  const [jy, jm, jd] = normalized.split("/").map(Number)
  if (!jy || !jm || !jd) return ""
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd)
  return `${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`
}

/**
 * ✅ Converts ISO (Gregorian) → Jalali with Persian digits (formatted "YYYY/MM/DD")
 * Example:
 *   Input: "2025-10-30T00:00:00.000Z"
 *   Output: "۱۴۰۴/۰۸/۰۸"
 */
export const toJalaliPersian = (isoDate: string): string => {
  if (!isoDate) return ""
  
  try {
    const date = new Date(isoDate)
    if (isNaN(date.getTime())) return "" // Invalid date
    
    const { jy, jm, jd } = jalaali.toJalaali(date)
    
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    
    const jyPersian = jy.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)])
    const jmPersian = String(jm).padStart(2, '0').replace(/\d/g, (d) => persianDigits[parseInt(d)])
    const jdPersian = String(jd).padStart(2, '0').replace(/\d/g, (d) => persianDigits[parseInt(d)])
    
    return `${jyPersian}/${jmPersian}/${jdPersian}`
  } catch (error) {
    console.error('Error converting date to Jalali Persian:', error)
    return ""
  }
}
