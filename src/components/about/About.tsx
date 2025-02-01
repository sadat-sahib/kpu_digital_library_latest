import "tailwindcss/tailwind.css";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto text-center">
        {/* Single Image Section */}
        <div className="mb-8">
          <img
            src="/public/3.jpg" // تغییر این آدرس به مسیر تصویر مورد نظر
            alt="Library Image"
            className="w-full h-96 object-cover rounded-md shadow-lg"
          />
        </div>

        {/* About Text Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">کتابخانه پوهنتون پولیتخنیک کابل</h2>
          <p className="leading-relaxed text-lg mx-auto mb-6 max-w-3xl">
            کتابخانه ما مکانی الهام‌بخش برای مطالعه و تحقیق است. در اینجا به
            بهترین منابع علمی دسترسی دارید. ما به ارائه خدمات با کیفیت بالا
            متعهد هستیم و امیدواریم محیطی ایده‌آل برای یادگیری شما فراهم
            کنیم. کتابخانه ما منابعی متنوع از کتاب‌ها و مقالات علمی را برای
            علاقه‌مندان به مطالعات مختلف فراهم کرده است.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
