

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

import { Loader } from "lucide-react";
import { useAddCategory } from "../../../config/client/DashCategoryRegistrationApi.query";
import DashCategoryTable from "./DashCategoryTable";
import { showToast } from "../../../utils/ShowToast";

const Schema = z.object({
  name: z.string().min(1, "این فیلد اجباری است"),
});

type FormFields = z.infer<typeof Schema>;

const DashCategoryRegistration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(Schema),
  });

  const addCategoryMutation = useAddCategory();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    addCategoryMutation.mutate(data, {
      onSuccess: () => {
        showToast({
          description: "کتگوری موفقانه اضافه گردید!",
          type: "success",
        });
        reset();
      },
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col p-8 bg-gray-100 rounded-md w-full">
        <h2 className="text-3xl font-bold text-center mb-8">ثبت کتگوری</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-4 w-full"
        >
          <div className="flex flex-col">
            <label className="font-semibold">کتگوری</label>
            <input
              type="text"
              {...register("name")}
              className="bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md p-2 w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded-md mt-6"
              disabled={addCategoryMutation.isPending}
            >
              {addCategoryMutation.isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "ثبت کتگوری"
              )}
            </button>
          </div>
        </form>

        <DashCategoryTable />
      </div>
    </div>
  );
};

export default DashCategoryRegistration;
