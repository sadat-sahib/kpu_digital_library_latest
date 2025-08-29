import React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "../axiosInstance";
import { useAuthStore } from "../Store/useAuthStore";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";
import { useAdminAuthStore } from "../Store/useAdminAuthStore";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const schema = z.object({
  firstName: z.string().min(1, "نام الزامی است"),
  lastName: z.string().min(1, "نام خانوادگی الزامی است"),
  email: z.string().email("ایمیل نامعتبر است"),
  phone: z
    .number()
    .min(100000000, "شماره تلفن نامعتبر است")
    .max(9999999999, "نمبر تماس نباید بیشتر از ۱۰ رقم باشد"),
  password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
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

interface Faculty {
  id: number;
  name: string;
  departments: Department[];
}

interface Department {
  id: number;
  name: string;
}

type FormFields = z.infer<typeof schema>;

interface UserRegistrationProps {
  userId?: number;
}
const UserRegistration: React.FC<UserRegistrationProps> = ({ userId }) => {
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [selectedFac, setSelectedFac] = useState<Faculty>();
  const [response, setResponse] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { token } = useAdminAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  //const selectedImage = watch('image');
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Setting department based on the faculty
  const handleDepartment = (e: ChangeEvent<HTMLSelectElement>) => {
    const facultyId = parseInt(e.target.value, 10);
    const selectedFaculty = faculties.find(
      (faculty) => faculty.id === facultyId
    );
    console.log(selectedFaculty);
    setSelectedFac(selectedFaculty);
  };
  useEffect(() => {
    axios.get("/api/home/faculties-with-departments").then((response) => {
      setFaculties(response.data.faculties);
    });
    if (userId) {
      setIsEditing(true);
      console.log("userId: ", userId);
      axios
        .get(`api/dashboard/users/edit/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const userData = response.data.data;
          Object.keys(userData).forEach((key) => {
            if (key === "image") return;
            setValue(key as keyof FormFields, userData[key]);
          });
        });
    }
  }, [userId, setValue, token]);
  // Submitting the from field
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    setLoading(true);
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("type", data.type);
    formData.append("email", data.email);
    formData.append("dep_id", String(data.dep_id));
    formData.append("fac_id", String(data.fac_id));
    formData.append("phone", data.phone.toString());
    formData.append("password", data.password);
    formData.append("nic", data.nic);
    formData.append("nin", data.nin);
    formData.append("current_residence", data.current_residence);
    formData.append("original_residence", data.original_residence);
    if (isEditing) {
      formData.append("_method", "PUT");
      formData.append("status", "active");
    }
    // Append image
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    const url = isEditing
      ? `/api/dashboard/users/update/${userId}`
      : "/api/register";
    const method = isEditing ? axios.post : axios.post;

    method(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          const loggedInUser = {
            email: response.data.user?.email,
            status: response.data.user?.status,
            type: response.data.user?.type,
          };
          const userToken = response.data.token;
          const isLoggedIn = true;
          setUser(loggedInUser, userToken, isLoggedIn);
          Swal.fire({
            title: "Success!",
            text: "کاربر موفقانه راجستر گردید!",
            icon: "success",
            confirmButtonText: "OK",
          });
          setLoading(false);
          if (currentPath === "/register") {
            navigate("/");
          }
          setResponse("");
          reset();
        }
      })
      .catch((err) => {
        if (err.response) {
          console.error("Error response:", err.response.data);
        } else {
          console.error("Error:", err.message);
        }
        if (err) {
          setResponse(err.response?.data?.message || "An error occurred");
          setLoading(false);
          console.log(err);
        } else {
          setResponse("");
        }
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl md:flex-row">
        {/* فرم ثبت‌نام */}
        <div className="flex flex-1 flex-col justify-center p-8 rtl text-right">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* عنوان */}
            <div className="mb-6 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold text-gray-800">فرم ثبت نام</h2>
              <p className="mt-1 text-sm text-gray-500">
                لطفاً تمام معلومات خود را وارد کنید
              </p>
            </div>

            {/* ورودی‌ها */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* نقش شما */}
              <div>
                <select
                  {...register("type")}
                  id="role"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-right text-gray-600 
               focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                  <option value="">نقش خود را انتخاب کنید</option>
                  <option value="admin">مدیر</option>
                  <option value="student">محصل</option>
                  <option value="teacher">استاد</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.type.message}
                  </p>
                )}
              </div>

              {/* پوهنزی */}
              <div>
                <select
                  {...register("fac_id")}
                  id="faculty"
                  onChange={handleDepartment}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-right text-gray-600 
               focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                  <option value="">انتخاب پوهنځی</option>
                  {faculties.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
                {errors.fac_id && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.fac_id.message}
                  </p>
                )}
              </div>

              {/* دیپارتمنت */}
              <div>
                <select
                  {...register("dep_id")}
                  id="department"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-right text-gray-600 
               focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                  <option value="">انتخاب دیپارتمنت</option>
                  {selectedFac?.departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
                {errors.dep_id && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.dep_id.message}
                  </p>
                )}
              </div>

              {/* آیدی پوهنتون */}
              <div>
                <Input
                  {...register("nin")}
                  type="text"
                  placeholder="آیدی پوهنتون"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-right 
               placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.nin && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.nin.message}
                  </p>
                )}
              </div>

              {/* شماره تذکره */}
              <div>
                <Input
                  {...register("nic")}
                  type="text"
                  placeholder="نمبر تذکره"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-right 
               placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.nic && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.nic.message}
                  </p>
                )}
              </div>

              {/* سکونت قبلی */}
              <div>
                <Input
                  {...register("original_residence")}
                  type="text"
                  placeholder="سکونت قبلی"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-right 
               placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.original_residence && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.original_residence.message}
                  </p>
                )}
              </div>

              {/* سکونت فعلی */}
              <div>
                <Input
                  {...register("current_residence")}
                  type="text"
                  placeholder="سکونت فعلی"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-right 
               placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.current_residence && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.current_residence.message}
                  </p>
                )}
              </div>

              {/* نام */}
              <div>
                <Input
                  {...register("firstName")}
                  type="text"
                  placeholder="نام شما"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-right 
               placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* نام خانوادگی */}
              <div>
                <Input
                  {...register("lastName")}
                  type="text"
                  placeholder="نام خانوادگی شما"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-right 
               placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* تلفن */}
              <div>
                <Input
                  {...register("phone", { valueAsNumber: true })}
                  type="tel"
                  placeholder="شماره تلفن شما"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-right 
               placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* ایمیل */}
              <div>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="ایمیل شما"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-right 
               placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* عکس */}
              <div>
                <input
                  {...register("image")}
                  type="file"
                  onChange={handleImageChange}
                  className="block w-full cursor-pointer rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-right text-gray-600 
               file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:px-4 file:py-2 
               file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600 
               focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.image && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* رمز عبور */}
              <div>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="رمز عبور"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-right 
               placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* دکمه ثبت */}
            <Button
              type="submit"
              className="mt-6 w-full bg-blue-500 text-white hover:bg-blue-600"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : isEditing ? (
                "افزودن تغیرات"
              ) : (
                "ثبت نام"
              )}
            </Button>
           
              <p className="mt-4 text-center text-sm text-gray-600">
                قبلا حساب داشته اید:{" "}
                <Link
                  to={"/login"}
                  className="text-blue-500 hover:underline mt-2"
                >
                  ورود{" "}
                </Link>
              </p>
            
          </form>
        </div>
      </div>
    </div>
  );
};
export default UserRegistration;
