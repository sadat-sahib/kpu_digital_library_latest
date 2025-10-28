// import { z } from "zod";

// export const schema = z.object({
//   firstName: z
//     .string()
//     .min(2, "نام باید حداقل دو حرف باشد")
//     .regex(/^[آ-یA-Za-z\s]+$/, "نام فقط باید شامل حروف باشد"),
//   lastName: z
//     .string()
//     .min(2, "نام خانوادگی باید حداقل دو حرف باشد")
//     .regex(/^[آ-یA-Za-z\s]+$/, "نام خانوادگی فقط باید شامل حروف باشد"),
//   email: z.string().email("ایمیل نامعتبر است"),
//   phone: z
//     .string()
//     .regex(/^07\d{8}$/, "شماره باید با 07 شروع شود و ده رقم باشد"),
//   password: z
//     .string()
//     .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
//     .max(50, "رمز عبور نباید از ۵۰ کاراکتر بیشتر باشد"),
//   nic: z
//     .string()
//     .regex(/^\d+$/, "نمبر تذکره فقط باید عدد باشد"),
//   nin: z
//     .string()
//     .regex(/^\d+$/, "آی‌دی پوهنتون فقط باید عدد باشد"),
//   current_residence: z.string().min(1, "آدرس فعلی ضروری است"),
//   original_residence: z.string().min(1, "آدرس قبلی ضروری است"),
//   fac_id: z.coerce.number().min(1, "پوهنځی را انتخاب کنید"),
//   dep_id: z.coerce.number().min(1, "دیپارتمنت را انتخاب کنید"),
//   image: z
//     .any()
//     .optional()
//     .refine(
//       (file) => !file || file instanceof File || file instanceof FileList,
//       "لطفاً عکس معتبر انتخاب کنید"
//     ),
//   type: z.string().min(1, "نقش شما ضروری است"),
// });

// export type UserFormFields = z.infer<typeof schema>;
import { z } from "zod";
export const schema = z.object({
  firstName: z.string().min(1, "نام الزامی است"),
  lastName: z.string().min(1, "نام خانوادگی الزامی است"),
  email: z.string().email("ایمیل نامعتبر است"),
  phone: z
    .number()
    .min(100000000, "شماره تلفن نامعتبر است")
    .max(9999999999, "نمبر تماس نباید بیشتر از ۱۰ رقم باشد"),
  password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
  nic: z.string().min(1, "نمبر تذکره ضروری مباشد"),
  nin: z.string().min(1, "آی‌دی کارت پوهنتون ضروری میباشد"),
  current_residence: z.string().min(1, "آدرس فعلی شما ضروری مباشد"),
  original_residence: z.string().min(1, "آدرس قبلی شما ضروری مباشد"),
  fac_id: z.preprocess((val) => Number(val), z.number()),
  dep_id: z.preprocess((val) => Number(val), z.number()),
  // image: z.preprocess((val) => (val instanceof FileList ? val[0] : val), z.instanceof(File, { message: 'لطفاً عکس خود را آپلود کنید' })),
  image: z.optional(
    z
      .instanceof(File)
      .or(z.instanceof(FileList).transform((val) => val[0]))
      .refine((val) => val === undefined || val instanceof File, {
        message: "لطفاً عکس خود را آپلود کنید",
      })
  ),
  type: z.string().min(1, "نقش شما ضروری میباشد"),
});
export type UserFormFields = z.infer<typeof schema>;