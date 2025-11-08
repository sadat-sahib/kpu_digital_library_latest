
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
const socialLinks = [
  { name: "فیسبوک", href: "#", icon: Facebook },
  { name: "توییتر", href: "#", icon: Twitter },
  { name: "اینستاگرام", href: "#", icon: Instagram },
  { name: "لینکدین", href: "#", icon: Linkedin },
];

export default function Contact() {

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">تماس با ما</h1>
        <p className="text-muted-foreground max-w-2xl">
          سوالی درباره خدمات کتابخانه دیجیتال ما دارید؟ ما اینجا هستیم تا به شما
          کمک کنیم. با تیم ما برای کمک در زمینه تحقیق، منابع یا پشتیبانی فنی
          تماس بگیرید.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" color="blue" />
              ایمیل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-1">کتابخانه</p>
            <p className="font-medium">library@university.ir</p>
            <p className="text-muted-foreground mt-3 mb-1">معاونیت تحقیقات</p>
            <p className="font-medium">support@university.ir</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" color="blue" />
              تماس تلفنی
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-1">شماره اصلی</p>
            <p className="font-medium">۰۲۱-۱۲۳۴۵۶۷۸</p>
            <p className="text-muted-foreground mt-3 mb-1">معاونیت تحقیقات</p>
            <p className="font-medium">۰۲۱-۱۲۳۴۵۶۷۹</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" color="blue" />
              ساعات کاری
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-1">جریان هفته</p>
            <p className="font-medium">شنبه تا چهارشنبه: ۸ صبح تا ۴ عصر</p>
            <p className="text-muted-foreground mt-3 mb-1">پشتیبانی آخر هفته</p>
            <p className="font-medium">پنجشنبه : ۸ صبح تا ۱ عصر</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl font-bold mb-6">ارسال پیام</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  نام و نام خانوادگی
                </label>
                <Input id="name" placeholder="نام شما" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  آدرس ایمیل
                </label>
                <Input id="email" type="email" placeholder="ایمیل شما" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                موضوع
              </label>
              <Input
                id="subject"
                placeholder="چگونه می‌توانیم به شما کمک کنیم؟"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                پیام
              </label>
              <Textarea
                id="message"
                placeholder="لطفاً جزئیات درخواست خود را شرح دهید..."
                rows={5}
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              ارسال پیام
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          <div>
            {/* <h2 className="text-2xl font-bold mb-6">ازدید از پردیس اصلی</h2> */}
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="h-5 w-5 text-primary mt-0.5" color="blue" />
              <div>
                <p className="font-medium">کتابخانه  پوهنتون پولیتخنیک</p>
                <p className="text-muted-foreground">
                  کارته مامورین، پوهنتون پولی تخنیک 
                </p>
                <p className="text-muted-foreground">کابل، افغانستان</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-4 w-24 h-24 bg-primary/10 rounded-lg"></div>
            <div className="absolute -bottom-6 -right-4 w-24 h-24 bg-primary/10 rounded-lg"></div>
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-xl">
              <img
                src="/1.jpg"
                alt="کتابخانه دیجیتال دانشگاه"
                className="object-cover h-full w-full"
              />
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-3">
              با ما در ارتباط باشید
            </h3>
            <div className="flex gap-4">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  className="w-10 h-10 rounded-full bg-gray-100 text-blue-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
