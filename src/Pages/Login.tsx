import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../axiosInstance';
import { useState } from 'react';
import { useAuthStore } from '../Store/useAuthStore';
import { Loader } from 'lucide-react';

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