<div dir="rtl">

<h1 align="right">🇮🇷 ویرایشگر متن غنی فارسی</h1>

<p align="right">
یک ویرایشگر متن غنی (Rich Text Editor) مدرن و کامل برای محتوای فارسی، مبتنی بر <strong>Tiptap</strong> و <strong>React</strong>.
این ویرایشگر با پشتیبانی کامل از <strong>راست‌به‌چپ (RTL)</strong>، فونت <strong>وزیرمتن</strong> و امکانات اختصاصی فارسی همراه است.
</p>

<p align="right">
  <a href="https://github.com/ueberdosis/tiptap"><img src="https://img.shields.io/badge/Tiptap-v3-7D00FF" alt="Tiptap v3"></a>
  <img src="https://img.shields.io/badge/React-19-61DAFB" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-8-646CFF" alt="Vite 8">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/Bun-package--manager-F9F1DC" alt="Bun">
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6" alt="TypeScript">
</p>

<p align="right">
  <a href="https://farsi-rich-text-editor.vercel.app/">نمایش زنده</a>
</p>

---

## ✨ امکانات

<strong>قالب‌بندی متن</strong>

- **درشت (Bold)** ، **مورب (Italic)** ، **زیرخط (Underline)** و **خط‌خورده (Strikethrough)**
- **رنگ متن** و **هایلایت چندرنگ** متن
- **اندازه فونت**: ۱۴px ، ۱۶px ، ۱۸px ، ۲۰px و ۲۴px با ارتفاع خط متناسب
- **بالانویس (Superscript)** و **پایین‌نویس (Subscript)**
- عنوان‌ها از سطح ۲ تا ۶ + پاراگراف
- **پیش‌نمایش / ویرایش**: جابه‌جایی بین حالت پیش‌نمایش و ویرایش با یک دکمه

<strong>ساختار و چیدمان</strong>

- **لیست نقطه‌ای** و **لیست شماره‌دار**
- **تراز متن**: راست‌چین، چپ‌چین، وسط‌چین و بلوکی
- **جهت متن**: راست‌به‌چپ (RTL) و چپ‌به‌راست (LTR) در سطح بلاک
- **نقل‌قول (Blockquote)** و **خط افقی**

<strong>رسانه و محتوای پیشرفته</strong>

- **جدول**: افزودن، ویرایش و حذف جدول با انتخاب تعداد سطر و ستون (۱ تا ۱۰)
- **منوی حبابکی جدول**: افزودن/حذف سطر و ستون، تغییر سرستون و حذف جدول با کلیک درون جدول
- **جدول RTL**: تغییر اندازه ستون با کشیدن مرزها (سازگار با راست‌به‌چپ) و ناوبری با کلیدهای جهت‌دار
- **ردهای راه‌راه و هاور**: استایل راه‌راه (zebra striping) و هاور برای ردیف‌های جدول
- **لینک**: افزودن و ویرایش لینک با اعتبارسنجی آدرس
- **منوی حبابکی لینک**: ویرایش و حذف سریع لینک با کلیک روی لینک
- **جاسازی ویدئو**: افزودن ویدئو از طریق **آدرس (URL)** یا **جاسازی کد IFrame** با پشتیبانی از آپارات و سایر سرویس‌ها
- **حذف ویدئو**: دکمه حذف سریع ویدئو در گوشه ویدئو
- **افزودن عکس**: درج عکس با **آدرس (URL)** و متن جایگزین، با قابلیت نمایش **تمام‌عرض / اندازه پیش‌فرض** و حذف
- **بلاک کد**: درج کد با **هایلایت سینتکس** برای HTML ، CSS ، JavaScript ، TypeScript ، PHP ، Python ، JSON ، Bash ، SQL و Markdown (با جهت LTR خودکار)

<strong>امکانات اختصاصی فارسی</strong>

- 🎨 **انتخاب‌گر ایموجی** با ایموجی‌های یونیکد بومی
- 🧮 **شمارش کلمات و کاراکتر** و **زمان تخمینی مطالعه** در پایین ویرایشگر
- ⬅️ جهت پیش‌فرض **راست‌به‌چپ** (RTL)
- 🔤 فونت اختصاصی **وزیرمتن**

<strong>تجربه کاربری</strong>

- دکمه‌های **بازگردانی (Undo)** و **بازانجام (Redo)**
- تول‌تیپ فارسی برای تمام دکمه‌ها
- اعتبارسنجی مقادیر فرم‌ها با **Zod** و **react-hook-form**
- طراحی کاملاً ریسپانسیو با نوار ابزار قابل‌چینش

## 🛠 تکنولوژی‌ها

| تکنولوژی                                                                                 | کاربرد                         |
| ---------------------------------------------------------------------------------------- | ------------------------------ |
| [React 19](https://react.dev)                                                            | فریم‌ورک رابط کاربری           |
| [Tiptap v3](https://tiptap.dev)                                                          | موتور ویرایشگر متن غنی         |
| [Vite 8](https://vite.dev)                                                               | ابزار ساخت                     |
| [TanStack Router](https://tanstack.com/router)                                           | مسیریابی                       |
| [TanStack Query](https://tanstack.com/query)                                             | مدیریت داده سمت سرور           |
| [Tailwind CSS v4](https://tailwindcss.com)                                               | استایل‌دهی                     |
| [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com)                | کامپوننت‌های رابط کاربری       |
| [Zod](https://zod.dev) + [react-hook-form](https://react-hook-form.com)                  | اعتبارسنجی و فرم‌ها            |
| [lowlight](https://github.com/wooorm/lowlight) + [highlight.js](https://highlightjs.org) | هایلایت سینتکس کد              |
| [Bun](https://bun.sh)                                                                    | مدیریت پکیج و اجرای اسکریپت‌ها |

## 📦 پیش‌نیازها

- [Bun](https://bun.sh) نسخه ۱.۱ یا بالاتر
- [Node.js](https://nodejs.org) نسخه ۲۰ یا بالاتر (برای برخی ابزارها)

## 🚀 نصب و راه‌اندازی

<pre dir="ltr">
# نصب وابستگی‌ها
bun install

# اجرای محیط توسعه (پورت 5000)
bun run dev
</pre>

سپس در مرورگر خود به آدرس `http://localhost:5000` مراجعه کنید.

### اسکریپت‌های موجود

| اسکریپت                   | توضیح                                  |
| ------------------------- | -------------------------------------- |
| `bun run dev`             | اجرای سرور توسعه روی پورت 5000         |
| `bun run build`           | ساخت نسخه نهایی پروژه                  |
| `bun run preview`         | پیش‌نمایش نسخه ساخته‌شده روی پورت 5000 |
| `bun run lint`            | بررسی و بازبینی کد با ESLint           |
| `bun run format`          | فرمت‌کردن کدها با Prettier و ESLint    |
| `bun run check`           | بررسی فرمت کدها                        |
| `bun run generate-routes` | تولید خودکار روت‌های TanStack Router   |

## 💻 نحوه استفاده

کامپوننت اصلی ویرایشگر در فایل `src/farsi-rich-text-editor/index.tsx` قرار دارد.

<pre dir="ltr">
import { FarsiRichTextEditor } from '#/farsi-rich-text-editor/index.tsx'

function App() {
  return &lt;FarsiRichTextEditor autofocus /&gt;
}
</pre>

کامپوننت از سه بخش اصلی تشکیل شده است:

1. **نوار ابزار** (`FRTE_Toolbar`) — تمام دکمه‌ها و منوهای کشویی قالب‌بندی
2. **محتوای قابل ویرایش** (`FRTE_Content`) — ناحیه تایپ با استایل‌های typography
3. **پاورقی** (`FRTE_Footer`) — شمارش کلمات و کاراکتر، زمان تخمینی مطالعه

### اکستنشن‌های سفارشی

| فایل                                       | توضیح                                           |
| ------------------------------------------ | ----------------------------------------------- |
| `extensions/video-url.ts`                  | نود ویدئو با آدرس (URL) — نودویو با دکمه حذف    |
| `extensions/video-iframe.ts`               | نود ویدئو IFrame چندسرویسی — نودویو با دکمه حذف |
| `extensions/image.ts`                      | نود عکس با گزینه عرض کامل و دکمه حذف            |
| `extensions/custom-code-block.ts`          | بلاک کد lowlight با جهت خودکار LTR              |
| `extensions/column-resizing.ts`            | تغییر اندازه ستون جدول با پشتیبانی RTL          |
| `extensions/rtl-table-arrow-navigation.ts` | ناوبری با کلیدهای جهت‌دار در جدول RTL           |

### اسکیم‌های اعتبارسنجی

| فایل                         | توضیح                                           |
| ---------------------------- | ----------------------------------------------- |
| `zod-schema/url.ts`          | اعتبارسنجی متن و آدرس لینک                      |
| `zod-schema/table.ts`        | اعتبارسنجی تعداد سطر و ستون جدول (۱ تا ۱۰)      |
| `zod-schema/video-iframe.ts` | اعتبارسنجی کد IFrame با سیستم تشخیص سرویس‌دهنده |
| `zod-schema/image.ts`        | اعتبارسنجی آدرس و متن جایگزین عکس               |
| `zod-schema/boolean.ts`      | اعتبارسنجی مقدار بولین (برای فرم‌های چک‌باکس)   |

## 📁 ساختار پروژه

<pre dir="ltr">
src/
├── farsi-rich-text-editor/
│   ├── index.tsx                       # کامپوننت اصلی ویرایشگر
│   ├── content.tsx                     # ناحیه محتوای قابل ویرایش (شامل حالت پیش‌نمایش)
│   ├── footer.tsx                      # پاورقی با شمارش کلمات، کاراکتر و زمان مطالعه
│   ├── types.ts                        # تایپ‌های مشترک (LinkRange و ...)
│   ├── extensions/
│   │   ├── video-url.ts               # اکستنشن درج ویدئو از طریق آدرس (URL)
│   │   ├── video-iframe.ts             # اکستنشن جاسازی ویدئو (IFrame)
│   │   ├── image.ts                    # اکستنشن عکس با عرض کامل
│   │   ├── custom-code-block.ts        # اکستنشن بلاک کد با هایلایت سینتکس
│   │   ├── column-resizing.ts          # تغییر اندازه ستون جدول (RTL)
│   │   └── rtl-table-arrow-navigation.ts  # ناوبری کلیدهای جهت‌دار جدول (RTL)
│   ├── components/
│   │   ├── video-url-dialog.tsx        # دیالوگ درج ویدئو با آدرس (URL)
│   │   ├── video-iframe-dialog.tsx      # دیالوگ جاسازی ویدئو (IFrame)
│   │   ├── video-url-node-view.tsx      # نود ویدئو با آدرس (دکمه حذف)
│   │   ├── video-iframe-node-view.tsx   # نود ویدئو IFrame (دکمه حذف)
│   │   ├── image-node-view.tsx          # نود عکس (عرض کامل و حذف)
│   │   ├── table-bubble-menu.tsx        # منوی حبابکی جدول
│   │   └── link-bubble-menu.tsx         # منوی حبابکی لینک
│   ├── toolbar/                        # نوار ابزار و کامپوننت‌های آن
│   ├── styles.css                      # استایل‌های اسکوپ‌شده ویرایشگر
│   └── utils/
│       ├── index.ts                    # توابع کمکی (شمارش کلمات، حذف لینک و ...)
│       └── lowlight.ts                 # پیکربندی زبان‌های هایلایت
├── routes/                             # روت‌های TanStack Router
├── zod-schema/                         # اسکیم‌های اعتبارسنجی
├── font/vazirmatn/                     # فونت وزیرمتن (به همراه نصب local)
├── lib/utils.ts                        # توابع کمکی (cn و ...)
└── styles.css                          # استایل‌های سراسری
</pre>

## 📄 مجوز

این پروژه تحت لایسنس [MIT](LICENSE) منتشر شده است.

</div>

---

<p align="left">
<b>Built with 💜 for Persian-speaking users</b> — ساخته‌شده با عشق برای کاربران فارسی‌زبان
</p>
