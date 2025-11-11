
import {
  Book,
  Users,
  GraduationCap,
  BookOpen,
  Award,
  Globe,
  BookA,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useGetAllInformation } from "../../config/client/HomePgeApi.query";

import { BsFilePdf } from "react-icons/bs";
const historyData = [
  {
    year: "۱۳۴۲",
    title: "تاسیس",
    description:
    " این پوهنتون در ساحه  72 هکتار 360 جریب زمین در مربوطات ناحیه پنجم شاروالی  شهر کابل با اشتراک هیات دولتی داخلی وخارجی تهداب گذاری شد، که شامل تعمیرات تدریسی، لابراتوارها، کتابخانه، لیلیه محصلان، تعمیرات رهایشی استادان، طعام خانه با گنجایش  1000  تن در یک وقت، مسجد شریف با گنجایش حدود 500 نماز گذار در یک وقت، مجتمع ( Complex) سپورتی، تالار کنفرانس ها با گنجایش بیشتر از 1000 تن، ورکشاپ ها، پولیگون ها وساحات تفریحی می‎باشد",
    position: "right",
  },
  {
    year: "۱۳۵۱",
    title: "اولین فارغ‌التحصیلان",
    description:
  "بعد از تکمیل بلاک های تدریسی ولابراتوارها در سال 1346 خورشیدی این موسسه به پذیرش اولین دوره محصلین نایل آمده ودر سال1351 خورشیدی برای بار نخست فارغین خود را به سویه تحصیلی لسانس تقدیم جامعه کرده است.",
    position: "left",
  },
  {
    year: "۱۳۸۱",
    title: "تغیر نام از انستیتوت به پوهنتون",
    description:
  "تا سال 1381 این پوهنتون بنام انستیتوت پولی‎تخنیک کابل مسمی بود که بعد از آن به پوهنتون پولی‎تخنیک کابل تغییر نام داده شد.",
    position: "right",
  },
  {
    year: "۱۳۷۱",
    title: "فارغین درجه ماستری",
    description:
     "تا سالهای 1359 خورشیدی فارغین این موسسه سویه تحصیلی لسانس را کسب مینمودند، بعد از آن تا سال 1371 فارغین آن درجه تحصیل ماستر علوم انجنیری را داشت. درهمین دوره کادرهای ملی به سویه های عالی علمی و پیداگوژی تا سطح دکتورا  (PHD  ) نیز در این پوهنتون تربیه میشد و در کل بیشتر از 20 تن از دوکتورای خویش دفاع نموده اند",
    position: "left",
  },
];

export default function AboutPage() {
  const { data:info } = useGetAllInformation();
  

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          درباره کتابخانه دیجیتال ما
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          توانمندسازی آموزش از طریق دسترسی به دانش و منابع مطالعاتی موجود در کتابخانه 
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">ماموریت ما</h2>
          <p className="text-muted-foreground mb-4">
            کتابخانه دیجیتال پوهنتون متعهد به ارائه دسترسی عادلانه به دانش و
            تقویت اکتشافات فکری برای محصلین، اساتید و محققان در سراسر کشور
            است.
          </p>
          <p className="text-muted-foreground mb-4">
            ما تلاش می‌کنیم تا محیطی دیجیتال و فراگیر ایجاد کنیم که از سبک‌های
            مختلف یادگیری پشتیبانی کند، تعالی علمی را ترویج دهد و منابع علمی را
            برای نسل‌های آینده حفظ کند.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Book className="h-6 w-6 text-primary" color="blue"/>
              </div>
              <h3 className="text-xl font-bold">{info?.data.counts.all_books}+</h3>
              <p className="text-sm text-muted-foreground">منابع کتابخانه</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Users className="h-6 w-6 text-primary" color="blue"/>
              </div>
              <h3 className="text-xl font-bold">{info?.data.counts.all_registered_users}</h3>
              <p className="text-sm text-muted-foreground">کاربران فعال</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <BookA className="h-6 w-6 text-primary" color="blue"/>
              </div>
              <h3 className="text-xl font-bold">{info?.data.counts.all_barrowable_books}</h3>
              <p className="text-sm text-muted-foreground">کتاب های قابل امانت</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <BsFilePdf className="h-6 w-6 text-primary" color="blue"/>
              </div>
              <h3 className="text-xl font-bold">{info?.data.counts.pdf_books}</h3>
              <p className="text-sm text-muted-foreground">کتاب های پی دی اف</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-lg"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-lg"></div>
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img
              src="/1.jpg"
              alt="کتابخانه دیجیتال دانشگاه"
              width={800}
              height={600}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mb-20">
  <h2 className="text-3xl font-bold text-center mb-12">تاریخچه پوهنتون پولی تخنیک</h2>
  <div className="relative">
    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-muted"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {historyData.map((item, index) => (
        <div
          key={index}
          className={`relative mt-8 md:mt-24 ${
            item.position === "right" ? "md:col-start-1" : "md:col-start-2"
          }`}
        >
          <div
            className={`absolute top-6 w-4 h-4 rounded-full bg-blue-500 z-10 ${
              item.position === "right"
                ? "right-0 transform translate-x-1/2"
                : "left-0 transform -translate-x-1/2"
            }`}
          ></div>
          <Card
            className={`shadow-md ${
              item.position === "right" ? "md:mr-8" : "md:ml-8"
            }`}
          >
            <CardHeader>
              <CardTitle>{item.year}</CardTitle>
              <CardDescription>{item.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  </div>
</div>


      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">خدمات ما</h2>
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="students">برای محصلین</TabsTrigger>
            <TabsTrigger value="faculty">برای اساتید</TabsTrigger>
            <TabsTrigger value="researchers">برای محققان</TabsTrigger>
          </TabsList>
          <TabsContent value="students" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>کتاب‌های درسی دیجیتال</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
           دسترسی به منابع کتابخانه و قابلیت خواندن نسخه های پی دی اف کتاب ها و همچنان قابلیت ثبت درخواست کتاب برای امانت کتاب 
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Award className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>منابع مطالعاتی</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    منابع و کتاب های متفاوت در تمامی رشته ها که برای تمامی محصلین قابل دسترس می باشد 
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>همکاری با همتایان</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    فراهم کردن مکان آرام و مناسب برای مطالعات فردی و کار های گروهی که وابسته به کمپیوتر و انترنت هستند
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="faculty" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <GraduationCap className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>مواد درسی</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    ایجاد و توزیع بسته‌های درسی دیجیتال، فهرست‌های مطالعاتی و
                    محتوای چندرسانه‌ای برای دانشجویان.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Book className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>پشتیبانی انتشارات</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    ابزارها و منابعی برای کمک به انتشار و اشتراک‌گذاری کارهای
                    علمی شما با جامعه گسترده‌تر.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>منابع آموزشی</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    مواد آموزشی، طرح‌های درس و ابزارهای ارزیابی برای افزایش
                    اثربخشی تدریس شما.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="researchers" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Globe className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>پایگاه‌های داده جهانی</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    دسترسی به پایگاه‌های داده تحقیقاتی، مجلات و انتشارات برتر از
                    سراسر جهان.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Award className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>تحلیل داده</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    ابزارهای پیشرفته برای تجسم داده، تحلیل آماری و همکاری
                    تحقیقاتی.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Book className="h-8 w-8 text-primary mb-2" color="blue" />
                  <CardTitle>دسترسی به آرشیو</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    اسناد تاریخی دیجیتالی، نسخه‌های خطی نادر و مجموعه‌های ویژه
                    برای تحقیقات منبع اولیه.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-muted/30 rounded-xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">به جامعه ما بپیوندید</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            بخشی از جامعه در حال رشد یادگیرندگان، مدرسان و محققان ما شوید. با
            هم، ما در حال ساختن آینده آموزش دیجیتال هستیم.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            تماس با ما
          </a>
        </div>
      </div>
    </div>
  );
}
