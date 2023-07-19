import Link from "next/link";

export default function Page() {
  return (
    <div>
      {/*  */}
      صفحه اصلی
      <br />
      <Link href="/admin" className="font-bold text-blue-500 underline">
        پنل مدیریت
      </Link>
    </div>
  );
}
