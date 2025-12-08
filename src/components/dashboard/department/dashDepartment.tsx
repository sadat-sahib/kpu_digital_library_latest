

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

import { Loader } from "lucide-react";
import DashDepartmentTable from "./dashDepartmentTable";
import { useAddDepartment } from "../../../config/client/DashDepartmentRegisterApi.query";
import { useGetFaculties } from "../../../config/client/DashFacultyApi.query";
import { showToast } from "../../../utils/ShowToast";

const Schema = z.object({
  fac_id: z.preprocess((val) => Number(val), z.number().min(1, "پوهنځی الزامی است")),
  name: z.string().min(1, "این فیلد اجباری است"),
});

type FormFields = z.infer<typeof Schema>;

const DashDepartment: React.FC = () => {
  const { data: faculties, isLoading: loadingFaculties } = useGetFaculties();
  const { mutate, isPending, error } = useAddDepartment();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(Schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutate(data, {
      onSuccess: () => {
        showToast({
          description: "دیپارتمنت موفقانه اضافه گردید!",
          type: "success",
        });
        reset();
      },
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col p-8 bg-gray-100 rounded-md w-full">
        <h2 className="text-3xl font-bold text-center mb-8">ثبت دیپارتمنت</h2>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            {(error as any).message || "خطا در ثبت دیپارتمنت"}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-4 w-full"
        >
        
          <div className="flex flex-col">
            <label htmlFor="faculty" className="font-semibold">
              پوهنځی
            </label>
            <select
              {...register("fac_id")}
              id="faculty"
              disabled={loadingFaculties}
              className="bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md p-2"
            >
              <option value="">انتخاب پوهنځی</option>
              {faculties &&
                faculties.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name}
                  </option>
                ))}
            </select>
            {errors.fac_id && (
              <span className="text-red-500">{errors.fac_id.message}</span>
            )}
          </div>

          {/* دیپارتمنت */}
          <div className="flex flex-col">
            <label className="font-semibold">دیپارتمنت</label>
            <input
              type="text"
              {...register("name")}
              className="bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md p-2 w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          
          <div className="flex ">
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded-md mt-6"
            >
              {isPending ? <Loader className="animate-spin" /> : "ثبت دیپارتمنت"}
            </button>
          </div>
        </form>

        <DashDepartmentTable />
      </div>
    </div>
  );
};

export default DashDepartment;
