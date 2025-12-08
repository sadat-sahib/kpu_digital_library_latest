import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { Loader } from "lucide-react";
import DashSectionTable from "./dashSectionTable";
import { useAddSection } from "../../../config/client/DashSectionApi.query";
import { showToast } from "../../../utils/ShowToast";

const Schema = z.object({
  section: z.string().min(1, "این فیلد اجباری است"),
});

type FormFields = z.infer<typeof Schema>;

const DashSectionRegistration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(Schema),
  });

  const { mutate, isPending, isError, error } = useAddSection();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutate(data, {
      onSuccess: () =>
        showToast({
          description: "بخش موفقانه اضافه گردید!",
          type: "success",
        }),
      onError: () =>
        showToast({
          description: "اضافه کردن بخش موفقانه نبود.",
          type: "error",
        }),
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col p-8 bg-gray-100 rounded-md w-full">
        <h2 className="text-3xl font-bold text-center mb-8">ثبت الماری</h2>

        {isError && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            {(error as any)?.message || "خطا در اضافه کردن بخش"}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-4 w-full"
        >
          <div className="flex flex-col">
            <label className="font-semibold">الماری</label>
            <input
              type="text"
              {...register("section")}
              className="bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md p-2 w-full"
            />
            {errors.section && (
              <p className="text-red-500">{errors.section.message}</p>
            )}
          </div>
          <div className="">
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded-md mt-6 flex justify-center items-center"
            >
              {isPending ? <Loader className="animate-spin" /> : "ثبت الماری"}
            </button>
          </div>
        </form>

        {/* جدول */}
        <DashSectionTable />
      </div>
    </div>
  );
};

export default DashSectionRegistration;
