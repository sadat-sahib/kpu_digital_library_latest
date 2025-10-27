// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import axios from '../axiosInstance';
// import { useState } from 'react';
// import { useAuthStore } from '../Store/useAuthStore';
// import { Loader } from 'lucide-react';
// import React from 'react';

// const signInSchema = z.object({
//   email: z.string().min(1, "Email is required").email("Invalid email format"),
//   password: z.string().min(6, "Password must be at least 6 characters long"),
// });

// type SignInFormData = z.infer<typeof signInSchema>;

// const Login: React.FC = () => {
//   const { setUser } = useAuthStore();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || '/';
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [response, setResponse] = useState<string>('');

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignInFormData>({
//     resolver: zodResolver(signInSchema),
//   });

//   const onSubmit = (data: SignInFormData) => {
//     setIsLoading(true);
//     axios.post('/api/login', data)
//       .then((response) => {
//         if (response.status === 200) {
//           const loggedInUser = { email: response.data.user.email, status: response.data.user.status, type: response.data.user.type };
//           const userToken = response.data.token;
//           const isLoggedIn = true;

//           setUser(loggedInUser, userToken, isLoggedIn);
//           setResponse(response.data.message);
//           localStorage.setItem('token', response.data.token);
//           navigate(from, { replace: true });
//         }
//       })
//       .catch((error) => {
//         if (error.response) {
//           setResponse(error.response.data.message || "Login failed. Please try again.");
//         } else if (error.request) {
//           setResponse("Network error. Please check your connection.");
//         } else {
//           setResponse("An unexpected error occurred. Please try again.");
//         }
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-md">
//       <h2 className="text-2xl font-bold my-12 text-center text-blue-600">ورود به حساب</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 border border-gray-300 shadow-md rounded-lg">
        
//         <div className="relative">
//           <input
//             id="email"
//             type="email"
//             {...register('email')}
//             aria-invalid={!!errors.email}
//             aria-describedby="email-error"
//             className={`peer w-full px-4 py-2 border-2 rounded-md focus:border-blue-500 outline-none transition-all ${
//               errors.email ? 'border-red-500' : 'border-gray-300'
//             }`}
//             placeholder=" "
//           />
//           <label htmlFor="email" className="login-label">
//             ایمیل آدرس
//           </label>
//           {errors.email && (
//             <p id="email-error" className="text-red-500 text-sm mt-1">
//               {errors.email.message}
//             </p>
//           )}
//         </div>

//         <div className="relative">
//           <input
//             id="password"
//             type="password"
//             {...register('password')}
//             aria-invalid={!!errors.password}
//             aria-describedby="password-error"
//             className={`peer w-full px-4 py-2 border-2 rounded-md focus:border-blue-500 outline-none transition-all ${
//               errors.password ? 'border-red-500' : 'border-gray-300'
//             }`}
//             placeholder=" "
//           />
//           <label htmlFor="password" className="login-label">
//             رمز عبور
//           </label>
//           {errors.password && (
//             <p id="password-error" className="text-red-500 text-sm mt-1">
//               {errors.password.message}
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`flex justify-center items-center w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors ${
//             isLoading ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           {isLoading ? <Loader className='animate-spin text-white'/> : 'ورود'}
//         </button>
//         {response && <p className="text-red-500 text-center mt-2">{response}</p>}
//         <p className="text-center">
//           قبلا حساب نداشته اید؟ <Link to="/user-registration" className="text-blue-500 hover:underline">ثبت نام</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;



// import { useState } from "react";
// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";
// import { User, Lock, LogIn } from "lucide-react";
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import axios from '../axiosInstance';
// import { useAuthStore } from '../Store/useAuthStore';
// import { Loader } from 'lucide-react';

// const signInSchema = z.object({
//   email: z.string().min(1, "Email is required").email("Invalid email format"),
//   password: z.string().min(6, "Password must be at least 6 characters long"),
// });

// type SignInFormData = z.infer<typeof signInSchema>;

// export default function LoginForm() {
//   const { setUser } = useAuthStore();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || '/';
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [response, setResponse] = useState<string>('');

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignInFormData>({
//     resolver: zodResolver(signInSchema),
//   });

//   const onSubmit = (data: SignInFormData) => {
//     setIsLoading(true);
//     axios.post('/api/login', data)
//       .then((response) => {
//         if (response.status === 200) {
//           const loggedInUser = { email: response.data.user.email, status: response.data.user.status, type: response.data.user.type };
//           const userToken = response.data.token;
//           const isLoggedIn = true;

//           setUser(loggedInUser, userToken, isLoggedIn);
//           setResponse(response.data.message);
//           localStorage.setItem('token', response.data.token);
//           navigate(from, { replace: true });
//         }
//       })
//       .catch((error) => {
//         if (error.response) {
//           setResponse(error.response.data.message || "Login failed. Please try again.");
//         } else if (error.request) {
//           setResponse("Network error. Please check your connection.");
//         } else {
//           setResponse("An unexpected error occurred. Please try again.");
//         }
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-4">
//       <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl md:flex-row">
//         {/* بخش خوش آمدید */}
//         <div className="flex flex-1 flex-col items-center justify-center bg-blue-500 p-8 text-white">
//           <h2 className="mb-2 text-3xl font-bold">سلام، خوش آمدید!</h2>
//           <p className="mb-4">آیا حساب ندارید؟</p>
//           <Button
//             variant="outline"
//             className="border-white text-white hover:bg-white hover:text-blue-500 transition-colors"
//           >
//             <Link to="/user-registration" className="text-black text-lg hover:text-blue-500 transition-colors duration-200">ثبت نام</Link>
//           </Button>
//         </div>

//         {/* فرم لاگین */}
//         <div className="flex flex-1 flex-col justify-center p-8 rtl text-right">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-6 flex flex-col items-center justify-center text-center">
//               <LogIn className="mb-2 h-8 w-8 text-blue-500" />
//               <h2 className="text-2xl font-bold text-gray-800">خوش آمدید 👋</h2>
//               <p className="text-sm text-gray-500 mt-1">برای دسترسی وارد حساب‌ تان شوید</p>
//             </div>

//             <div className="mb-4 relative">
//               <Input
//                 type="email"
//                 {...register("email")}
//                 aria-invalid={!!errors.email}
//                 aria-describedby="email-error"
//                 placeholder="ایمیل یا نام کاربری"
//                 className="peer w-full rounded-md border border-gray-300 bg-gray-50 px-10 py-2 text-right placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
//               />
//               <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//             </div>

//             <div className="mb-6 relative">
//               <Input
//                 type="password"
//                 {...register("password")}
//                 aria-invalid={!!errors.password}
//                 aria-describedby="password-error"
//                 placeholder="رمز عبور"
//                 className="peer w-full rounded-md border border-gray-300 bg-gray-50 px-10 py-2 text-right placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
//               />
//               <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
//               {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//             </div>

//             <Button type="submit" disabled={isLoading} className="w-full bg-blue-500 text-white hover:bg-blue-600">
//               {isLoading ? <Loader className='animate-spin text-white' /> : 'ورود'}
//             </Button>

//             {response && <p className="text-red-500 text-center mt-4">{response}</p>}

//             <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
//               پلی‌تخنیک؛ مکانی برای شکوفایی استعدادها، ساخت آینده‌ای روشن و تحقق رویاهایی که به حقیقت می‌پیوندند.
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }




// -------------------------------------------------------
import { useState, useRef } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { User, Lock, LogIn } from "lucide-react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '../axiosInstance';
import { useAuthStore } from '../Store/useAuthStore';
import { Loader } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha"; // 👈 Import

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function LoginForm() {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');
  const recaptchaRef = useRef<ReCAPTCHA>(null); // 👈 Create ref

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      setResponse("لطفاً تأیید کنید که ربات نیستید.");
      return;
    }

    setIsLoading(true);
    axios.post('/api/login', {
      ...data,
      recaptcha_token: recaptchaToken, // 👈 Send to backend
    })
      .then((response) => {
        recaptchaRef.current?.reset(); // 👈 Reset after success
        if (response.status === 200) {
          const loggedInUser = { email: response.data.user.email, status: response.data.user.status, type: response.data.user.type };
          const userToken = response.data.token;
          const isLoggedIn = true;

          setUser(loggedInUser, userToken, isLoggedIn);
          localStorage.setItem('token', response.data.token);
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        recaptchaRef.current?.reset(); // 👈 Reset on error too
        if (error.response) {
          setResponse(error.response.data.message || "ورود ناموفق بود. لطفاً دوباره تلاش کنید.");
        } else if (error.request) {
          setResponse("خطای شبکه. لطفاً اتصال خود را بررسی کنید.");
        } else {
          setResponse("خطای غیرمنتظره‌ای رخ داد.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl md:flex-row">
        {/* Welcome Section */}
        <div className="flex flex-1 flex-col items-center justify-center bg-blue-500 p-8 text-white">
          <h2 className="mb-2 text-3xl font-bold">سلام، خوش آمدید!</h2>
          <p className="mb-4">آیا حساب ندارید؟</p>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-500 transition-colors"
          >
            <Link to="/user-registration" className="text-black text-lg hover:text-blue-500 transition-colors duration-200">ثبت نام</Link>
          </Button>
        </div>

        {/* Login Form */}
        <div className="flex flex-1 flex-col justify-center p-8 rtl text-right">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6 flex flex-col items-center justify-center text-center">
              <LogIn className="mb-2 h-8 w-8 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-800">خوش آمدید 👋</h2>
              <p className="text-sm text-gray-500 mt-1">برای دسترسی وارد حساب‌تان شوید</p>
            </div>

            <div className="mb-4 relative">
              <Input
                type="email"
                {...register("email")}
                aria-invalid={!!errors.email}
                placeholder="ایمیل یا نام کاربری"
                className="peer w-full rounded-md border border-gray-300 bg-gray-50 px-10 py-2 text-right placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-6 relative">
              <Input
                type="password"
                {...register("password")}
                aria-invalid={!!errors.password}
                placeholder="رمز عبور"
                className="peer w-full rounded-md border border-gray-300 bg-gray-50 px-10 py-2 text-right placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* 👇 reCAPTCHA Widget - THIS IS WHERE YOU PUT IT */}
            <div className="mb-4 flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LfztPcrAAAAAJL1S78kxqVz9hk1f4yltv9szvNw" // 👈 YOUR SITE KEY HERE
                hl="fa" // Persian/RTL support
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-blue-500 text-white hover:bg-blue-600">
              {isLoading ? <Loader className='animate-spin text-white' /> : 'ورود'}
            </Button>

            {response && <p className="text-red-500 text-center mt-4">{response}</p>}

            <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
              پلی‌تخنیک؛ مکانی برای شکوفایی استعدادها، ساخت آینده‌ای روشن و تحقق رویاهایی که به حقیقت می‌پیوندند.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}