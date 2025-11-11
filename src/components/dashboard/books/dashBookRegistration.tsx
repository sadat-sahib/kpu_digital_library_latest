import axios from "../../../axiosInstance";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { showToast } from "../../../utils/ShowToast";

type FormValues = {
  title: string;
  author: string;
  publisher: string;
  dep_id: number;
  cat_id: number;
  format: string;
  barrow: string;
  image: File;
  shelf: string;
  publicationYear: string;
  lang: string;
  translator: string;
  sec_id: string;
  lockerNumber: string;
  isbn: string;
  description: string;
  total: number;
  edition: string;
  code: string;
  pdf?: File;
};

interface Department {
  id: number;
  name: string;
}

interface Shelf {
  id: number;
  section: string;
}

interface Category {
  id: number;
  name: string;
}
interface DashBookRegistrationProps {
  bookId?: number;
}
const DashBookRegistration: React.FC<DashBookRegistrationProps> = ({
  bookId,
}) => {
  const [faculties, setFaculties] = useState<Department[]>([]);
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [response, setResponse] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [bookFormat, setBookFormat] = useState("hard");
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>();

  const handleFormatChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBookFormat(e.target.value);
  };

  useEffect(() => {
    axios
      .get("/api/dashboard/departments", {
        withCredentials: true,
      })
      .then((response) => {
        setFaculties(response.data.data);
      });
    axios
      .get("/api/dashboard/sections", {
        withCredentials: true,
      })
      .then((response) => {
        setShelves(response.data.data);
        console.log(response.data.data);
      });
    axios
      .get("/api/dashboard/categories", {
        withCredentials: true,
      })
      .then((response) => {
        setCategories(response.data.data);
        console.log(response.data.data);
      });
    if (bookId) {
      setIsEditing(true);
      console.log("bookId: ", bookId);
      axios
        .get(`/api/dashboard/books/${bookId}`, {
          withCredentials: true,
        })
        .then((response) => {
          const bookData = response.data.data;
          Object.keys(bookData).forEach((key) => {
            if (key === "image" || key === "pdf") return;
            setValue(key as keyof FormValues, bookData[key]);
          });
          setBookFormat(bookData.format);
        });
    }
  }, [bookId, setValue]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("publisher", data.publisher);
    formData.append("dep_id", String(data.dep_id));
    formData.append("cat_id", String(data.cat_id));
    formData.append("format", data.format);
    formData.append("publicationYear", data.publicationYear);
    formData.append("lang", data.lang);
    formData.append("translator", data.translator);
    formData.append("description", data.description);
    formData.append("edition", data.edition);

    if (bookFormat === "hard" || bookFormat === "both") {
      formData.append("borrow", data.barrow);
      formData.append("shelf", data.shelf);
      formData.append("sec_id", data.sec_id);
      formData.append("isbn", data.isbn);
      formData.append("total", String(data.total));
      formData.append("code", data.code);
    }

    if (isEditing) {
      formData.append("_method", "PUT");
    }

    // Append image
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    if ((bookFormat === "pdf" || bookFormat === "both") && selectedFile) {
      formData.append("pdf", selectedFile);
    }

    setLoading(true);
    const url = isEditing
      ? `/api/dashboard/books/${bookId}`
      : "/api/dashboard/books";
    const method = isEditing ? axios.post : axios.post;

    console.log(Object.fromEntries(formData.entries()));
    method(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
      .then((response) => {
        setResponse(response.data.message);
        showToast({
          type: "success",
          description: isEditing
            ? "کتاب موفقانه آپدیت گردید!"
            : "کتاب موفقانه اضافه گردید!",
        });
        reset();
      })
      .catch((err) => {
        console.error(err);
        setResponse(err.response?.data?.message || "An error occurred");
        showToast({
          type: "error",
          description:
            err.response?.data?.message || "در هنگام ثبت کتاب خطا رخ داد!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col p-8 bg-gray-100 rounded-md w-full">
        <h2 className="text-3xl font-bold text-center mb-8">
          {isEditing ? "ویرایش کتاب" : "ثبت کتاب"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-4 w-full"
        >
          <div className="flex flex-col">
            <label className="font-semibold">نوعیت کتاب</label>
            <select
              {...register("format", { required: "این فیلد اجباری است" })}
              className="input"
              onChange={handleFormatChange}
              value={bookFormat}
            >
              <option value="hard">هارد</option>
              <option value="pdf">سافت</option>
              <option value="both">هردو</option>
            </select>
            {errors.format && (
              <span className="text-red-500 text-sm">
                {errors.format.message}
              </span>
            )}
          </div>

          {/* Common fields for all formats */}
          <div className="flex flex-col">
            <label className="font-semibold">عنوان</label>
            <input
              type="text"
              {...register("title", { required: "این فیلد اجباری است" })}
              className="input"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="faculty" className="font-semibold">
              کتگوری:
            </label>
            <select
              {...register("cat_id", { required: "این فیلد اجباری است" })}
              id="faculty"
              className="input"
            >
              <option value="">انتخاب کتگوری</option>
              {categories &&
                categories.map((f, index) => (
                  <option key={index} value={f.id}>
                    {f.name}
                  </option>
                ))}
            </select>
            {errors.cat_id && (
              <span className="text-red-500">{errors.cat_id.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="department" className="font-semibold">
              دپارتمنت:
            </label>
            <select
              {...register("dep_id", { required: "این فیلد اجباری است" })}
              id="department"
              className="input"
            >
              <option value="">انتخاب دیپارتمنت</option>
              {faculties &&
                faculties.map((d, index) => (
                  <option key={index} value={d.id}>
                    {d.name}
                  </option>
                ))}
            </select>
            {errors.dep_id && (
              <span className="text-red-500">{errors.dep_id.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">مولف</label>
            <input
              type="text"
              {...register("author", { required: "این فیلد اجباری است" })}
              className="input"
            />
            {errors.author && (
              <span className="text-red-500 text-sm">
                {errors.author.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">ناشر</label>
            <input type="text" {...register("publisher")} className="input" />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">چاپ</label>
            <input type="text" {...register("edition")} className="input" />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">زبان</label>
            <select {...register("lang")} className="input">
              <option value="fa">دری</option>
              <option value="en">انگلیسی</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">مترجم</label>
            <input type="text" {...register("translator")} className="input" />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">سال چاپ</label>
            <input
              type="number"
              {...register("publicationYear", {
                required: "این فیلد اجباری است",
              })}
              className="input"
            />
            {errors.publicationYear && (
              <span className="text-red-500 text-sm">
                {errors.publicationYear.message}
              </span>
            )}
          </div>

          {/* Fields for hard copy or both */}
          {(bookFormat === "hard" || bookFormat === "both") && (
            <>
              <div className="flex flex-col">
                <label className="font-semibold">تعداد</label>
                <input type="number" {...register("total")} className="input" />
                {errors.total && (
                  <span className="text-red-500 text-sm">
                    {errors.total.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">نام الماری</label>
                <select {...register("sec_id")} className="input">
                  <option value="">الماری انتخاب کنید</option>
                  {shelves &&
                    shelves.map((shelf) => (
                      <option key={shelf.id} value={shelf.id}>
                        {shelf.section}
                      </option>
                    ))}
                </select>
                {errors.sec_id && (
                  <span className="text-red-500">{errors.sec_id.message}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">نمبر قفسه</label>
                <input type="number" {...register("shelf")} className="input" />
                {errors.shelf && (
                  <span className="text-red-500">{errors.shelf.message}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">ISBN</label>
                <input type="text" {...register("isbn")} className="input" />
                {errors.isbn && (
                  <span className="text-red-500 text-sm">
                    {errors.isbn.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Code</label>
                <input type="text" {...register("code")} className="input" />
                {errors.code && (
                  <span className="text-red-500 text-sm">
                    {errors.code.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">اجازه امانت</label>
                <select {...register("barrow")} className="input">
                  <option value="yes">بلی</option>
                  <option value="no">نخیر</option>
                </select>
                {errors.barrow && (
                  <span className="text-red-500 text-sm">
                    {errors.barrow.message}
                  </span>
                )}
              </div>
            </>
          )}

          {/* Image upload for all formats */}
          <div className="flex flex-col">
            <label className="font-semibold">انتخاب عکس</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="input"
              required={bookFormat !== "pdf"}
            />
          </div>

          {/* PDF upload for soft or both formats */}
          {(bookFormat === "pdf" || bookFormat === "both") && (
            <div className="flex flex-col">
              <label className="font-semibold">انتخاب کتاب</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="input"
              />
            </div>
          )}

          <div className="flex flex-col col-span-3">
            <label className="font-semibold">شرح کتاب</label>
            <textarea
              {...register("description", { required: "این فیلد اجباری است" })}
              className="input"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-3 flex flex-col justify-center items-center">
            <p className="text-red-500 mt-2">{response}</p>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-md mt-4"
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : isEditing ? (
                "ویرایش کتاب"
              ) : (
                "ثبت کتاب"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashBookRegistration;
