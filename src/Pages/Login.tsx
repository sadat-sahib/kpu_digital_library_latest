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