
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { Loader } from "lucide-react";
import DashFacultyTable from "./dashFacultyTable";
import { useAddFaculty } from "../../../config/client/DashFacultyApi.query";
import { showToast } from "../../../utils/ShowToast";

const Schema = z.object({
  name: z.string().min(2, "نام پوهنځی باید حداقل ۲ حرف باشد"),
});
type FormFields = z.infer<typeof Schema>;

const DashFaculty: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(Schema),
  });

  const { mutate, isPending, error } = useAddFaculty();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutate(data, {
      onSuccess: () => {
        showToast({
          description: "پوهنځی موفقانه اضافه گردید!",
          type: "success",
        });
        reset();
      },
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col p-8 bg-gray-100 rounded-md w-full">
        <h2 className="text-3xl font-bold text-center mb-8">ثبت پوهنځی</h2>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            {(error as any).message || "خطا در ثبت پوهنځی"}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6">
          <div className="flex flex-col">
            <label className="font-semibold">پوهنځی</label>
            <input
              type="text"
              {...register("name")}
              className="bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md p-2 w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="col-span-3 flex flex-col justify-center items-center">
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-md mt-6"
            >
              {isPending ? <Loader className="animate-spin" /> : "ثبت پوهنځی"}
            </button>
          </div>
        </form>

        <DashFacultyTable />
      </div>
    </div>
  );
};

export default DashFaculty;
