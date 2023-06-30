import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
        <Link href="/admin/setting/initial">
          <div className="bg-green-500 py-20 text-center text-white font-black">
            {/*  */}
            تنظیمات اولیه
          </div>
        </Link>
        <Link href="/admin/setting/footer">
          <div className="bg-red-500 py-20 text-center text-white font-black">
            {/*  */}
            تنظیمات فوتر
          </div>
        </Link>
        <Link href="/admin/setting/smsTemplate">
          <div className="bg-pink-500 py-20 text-center text-white font-black">
            {/*  */}
            مدیریت قالب های پیامک
          </div>
        </Link>
        <Link href="/admin/setting/emailTemplate">
          <div className="bg-yellow-400 py-20 text-center text-white font-black">
            {/*  */}
            مدیریت قالب های ایمیل
          </div>
        </Link>
      </div>
    </>
  );
}
