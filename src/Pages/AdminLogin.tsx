
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../axiosInstance";
import { useAdminAuthStore } from "../Store/useAdminAuthStore";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router";
import ReCAPTCHA from "react-google-recaptcha";


const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const AdminLogin: React.FC = () => {
  const { setUser } = useAdminAuthStore();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

 const onSubmit = async (data: SignInFormData) => {

  const recaptchaToken = recaptchaRef.current?.getValue();
  if (!recaptchaToken) {
    setResponse("لطفاً تأیید کنید که ربات نیستید.");
    return;
  }
  setLoading(true);
  try {
    const res = await axios.post(
      "http://localhost:8000/api/admin/login", // full API URL
      {...data, recaptcha_token: recaptchaToken },
      {
        withCredentials: true, // 👈 Important: allow cookies
      }
    );

    console.log("Response: ", res);

    if (res.status === 200) {
      const user = res.data.data; // backend returns 'admin' object
      console.log("User Data: ", user);
      const loggedInUser = {
        email: user.email,
        status: user.status,
        type: user.type,
      };

      // ✅ No need to read token manually anymore
      // Cookie is automatically stored by browser (HttpOnly)

      const userIsAdmin = true;
      const type = user.type;
      const permission = user.role;

      // If your context still needs to store auth state
      setUser(loggedInUser, userIsAdmin, type, permission);

      // Redirect after login
      navigate("?tab=dashboard");
    }
  } catch (err) {
    console.error(err);
    setResponse("نام کاربری یا رمز عبور اشتباه است");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-bold my-12 text-center text-blue-600">
        ورود به حساب
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 border border-gray-300 shadow-md rounded-lg"
      >
        <div className="relative">
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`peer w-full px-4 py-2 border-2 rounded-md focus:border-blue-500 outline-none transition-all ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder=" "
          />
          <label htmlFor="email" className="login-label">
            ایمیل آدرس
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <input
            id="password"
            type="password"
            {...register("password")}
            className={`peer w-full px-4 py-2 border-2 rounded-md focus:border-blue-500 outline-none transition-all ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder=" "
          />
          <label htmlFor="password" className="login-label">
            رمز عبور
          </label>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>


        <div className="mb-4 flex justify-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LfztPcrAAAAAJL1S78kxqVz9hk1f4yltv9szvNw" // 👈 YOUR SITE KEY HERE
            hl="fa" // Persian/RTL support
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center text-center px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors"
        >
          {loading ? (
            <Loader size={25} className="animate-spin text-white" />
          ) : (
            "ورود"
          )}
        </button>
        {response && <p className="text-red-500 text-center mt-2">{response}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
