import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../axiosInstance';
import { useState } from 'react';
import { useAuthStore } from '../Store/useAuthStore';
import { Loader } from 'lucide-react';
import React from 'react';

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const Login: React.FC = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    setIsLoading(true);
    axios.post('/api/login', data)
      .then((response) => {
        if (response.status === 200) {
          const loggedInUser = { email: response.data.user.email, status: response.data.user.status, type: response.data.user.type };
          const userToken = response.data.token;
          const isLoggedIn = true;

          setUser(loggedInUser, userToken, isLoggedIn);
          setResponse(response.data.message);
          localStorage.setItem('token', response.data.token);
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        if (error.response) {
          setResponse(error.response.data.message || "Login failed. Please try again.");
        } else if (error.request) {
          setResponse("Network error. Please check your connection.");
        } else {
          setResponse("An unexpected error occurred. Please try again.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-bold my-12 text-center text-blue-600">ورود به حساب</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 border border-gray-300 shadow-md rounded-lg">
        
        <div className="relative">
          <input
            id="email"
            type="email"
            {...register('email')}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            className={`peer w-full px-4 py-2 border-2 rounded-md focus:border-blue-500 outline-none transition-all ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder=" "
          />
          <label htmlFor="email" className="login-label">
            ایمیل آدرس
          </label>
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            id="password"
            type="password"
            {...register('password')}
            aria-invalid={!!errors.password}
            aria-describedby="password-error"
            className={`peer w-full px-4 py-2 border-2 rounded-md focus:border-blue-500 outline-none transition-all ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder=" "
          />
          <label htmlFor="password" className="login-label">
            رمز عبور
          </label>
          {errors.password && (
            <p id="password-error" className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`flex justify-center items-center w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? <Loader className='animate-spin text-white'/> : 'ورود'}
        </button>
        {response && <p className="text-red-500 text-center mt-2">{response}</p>}
        <p className="text-center">
          قبلا حساب نداشته اید؟ <Link to="/user-registration" className="text-blue-500 hover:underline">ثبت نام</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;


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
//   email: z.string().min(1, "ایمیل ضروری است").email("فرمت ایمیل نادرست است"),
//   password: z.string().min(6, "رمز عبور باید حداقل ۶ حرف باشد"),
// });

// type SignInFormData = z.infer<typeof signInSchema>;

// const Login: React.FC = () => {
//   const { setUser } = useAuthStore();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || '/';

//   const [isLoading, setIsLoading] = useState(false);
//   const [responseMessage, setResponseMessage] = useState('');

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
//       .then((res) => {
//         if (res.status === 200) {
//           const { email, status, type } = res.data.user;
//           const token = res.data.token;

//           setUser({ email, status, type }, token, true);
//           localStorage.setItem('token', token);
//           navigate(from, { replace: true });
//         }
//       })
//       .catch((error) => {
//         if (error.response) {
//           setResponseMessage(error.response.data.message || "ورود ناموفق بود.");
//         } else if (error.request) {
//           setResponseMessage("مشکل در اتصال به اینترنت.");
//         } else {
//           setResponseMessage("خطای غیرمنتظره‌ای رخ داد.");
//         }
//       })
//       .finally(() => setIsLoading(false));
//   };

//   return (
//     <div className="flex min-h-screen flex-col md:flex-row">
      
//       {/* Image Section */}
//       <div className="hidden md:flex md:w-1/2 bg-blue-100 items-center justify-center p-8">
//         <img
//           src="/login-image.svg" // مسیر تصویر خودت را جایگزین کن
//           alt="ورود"
//           className="max-w-full h-auto"
//         />
//       </div>

//       {/* Form Section */}
//       <div className="flex flex-1 items-center justify-center p-6">
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">ورود به حساب</h2>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 shadow-lg rounded-xl border">

//             {/* Email Field */}
//             <div className="relative">
//               <input
//                 id="email"
//                 type="email"
//                 {...register('email')}
//                 className={`peer w-full border-2 rounded-md px-4 py-2 focus:border-blue-500 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//                 placeholder=" "
//               />
//               <label
//                 htmlFor="email"
//                 className="absolute right-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400"
//               >
//                 ایمیل آدرس
//               </label>
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//             </div>

//             {/* Password Field */}
//             <div className="relative">
//               <input
//                 id="password"
//                 type="password"
//                 {...register('password')}
//                 className={`peer w-full border-2 rounded-md px-4 py-2 focus:border-blue-500 outline-none transition-all ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
//                 placeholder=" "
//               />
//               <label
//                 htmlFor="password"
//                 className="absolute right-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400"
//               >
//                 رمز عبور
//               </label>
//               {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="flex w-full justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? <Loader className="animate-spin" /> : 'ورود'}
//             </button>

//             {/* Response Message */}
//             {responseMessage && <p className="text-red-500 text-center text-sm">{responseMessage}</p>}

//             {/* Register Link */}
//             <p className="text-center text-sm text-gray-600">
//               حساب کاربری ندارید؟{' '}
//               <Link to="/user-registration" className="text-blue-500 hover:underline">
//                 ثبت نام کنید
//               </Link>
//             </p>

//           </form>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Login;
