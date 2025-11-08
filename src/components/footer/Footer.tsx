
import { Facebook, Phone, Mail, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Links Section */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">لینک‌ها</h3>
          <ul className="space-y-2">
            <li>
              <Link to={'/'} className="hover:text-blue-400 transition">کتاب‌ها</Link>
            </li>
            <li>
              <Link to={'/about'} className="hover:text-blue-400 transition">درباره ما</Link>
            </li>
            <li>
              <Link to={'/contact'} className="hover:text-blue-400 transition">تماس با ما</Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">راه‌های ارتباطی</h3>
          <p className="mb-2 flex gap-1"><Phone size={24} className="hover:text-blue-400"/> 0202526381</p>
          <p className="mb-4 flex gap-1"><Mail size={24} className="hover:text-blue-400"/>chanellor@gmail.com</p>
          <div className="flex space-x-4 rtl:space-x-reverse">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">درباره کتابخانه</h3>
          <p>
            کتابخانه ما مکانی است برای مطالعه، تحقیق و دسترسی به منابع علمی. هدف
            ما فراهم کردن بهترین خدمات برای شماست.
          </p>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8">
        © 2025 تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
};

export default Footer;


