import { Card, CardHeader, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
import "tailwindcss/tailwind.css";

const Contact = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center py-10 animate-fade-in">
      <Card className="w-full max-w-5xl ">
        <CardHeader className="">
          <h6 className="text-2xl font-semibold text-center text-gray-800">ما مشتاق شنیدن نظرات شما هستیم</h6>
          <p className="text-center text-gray-500 mt-2">اگر سوالی دارید یا نیاز به همکاری دارید، پیام خود را برای ما ارسال کنید.</p>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row w-full">
          {/* Contact Information */}
          <div className="space-y-6 w-full lg:w-1/2">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">آدرس</h2>
              <p className="text-gray-600 flex items-center mt-2">
                <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                کارته مامورین، پوهنتون پولی تخنیک
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">اطلاعات تماس</h2>
              <p className="text-gray-600 flex items-center mt-2">
                <Phone className="w-5 h-5 text-gray-500 mr-2" />
                +93 (0) 78 595 504
              </p>
              <p className="text-gray-600 flex items-center mt-2">
                <Mail className="w-5 h-5 text-gray-500 mr-2" />
                info@example.com
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">رسانه‌های اجتماعی</h2>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition">
                  <Facebook  size={20}/>
                </a>
                <a href="#" className="text-gray-600 hover:text-pink-500 transition">
                  <Instagram  size={20}/>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-400 transition">
                  <Twitter  size={20}/>
                </a>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">ساعات کاری</h2>
              <p className="text-gray-600 mt-2">شنبه تا پنج‌شنبه: 8 صبح تا 4 عصر</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6 w-full lg:w-1/2 p-6 rounded-lg">
            <div className="flex flex-col lg:flex-row lg:gap-3">
              <div className="w-full lg:w-1/2">
                <label htmlFor="name" className="block text-gray-700 font-medium">نام</label>
                <Input
                  id="name"
                  placeholder="نام شما"
                  className="mt-1 border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full lg:w-1/2">
                <label htmlFor="email" className="block text-gray-700 font-medium">ایمیل</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ایمیل شما"
                  className="mt-1 border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium">پیام</label>
              <Textarea
                id="message"
                placeholder="پیام خود را اینجا بنویسید"
                className="mt-1 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 hover:bg-blue-700 transition-all"
            >
              ارسال پیام
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
