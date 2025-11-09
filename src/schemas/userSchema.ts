import { z } from "zod";
export const schema = z.object({
    firstName: z
    .string()
    .min(2, "نام باید حداقل دو حرف باشد")
    .regex(/^[آ-یA-Za-z\s]+$/, "نام فقط باید شامل حروف باشد"),
    lastName: z
    .string()
    .min(2, "نام خانوادگی باید حداقل دو حرف باشد")
    .regex(/^[آ-یA-Za-z\s]+$/, "نام خانوادگی فقط باید شامل حروف باشد"),
  email: z.string().email("ایمیل نامعتبر است"),
  phone: z
  .union([z.string(), z.number()])
  .transform(val => String(val))
  .refine(val => /^07\d{8}$/.test(val), {
    message: "شماره باید با 07 شروع شود و ده رقم باشد"
  }),
    
  password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
  ,
  nic: z.string().min(1, "نمبر تذکره ضروری مباشد").regex(/^\d+$/, "نمبر تذکره فقط باید عدد باشد"),
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

