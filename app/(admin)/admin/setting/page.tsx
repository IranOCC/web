import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
        <Link href="/panel/setting/initial">
          <div className="bg-green-500 py-20 text-center text-white font-black">
            {/*  */}
            تنظیمات اولیه
          </div>
        </Link>
        <Link href="/panel/setting/footer">
          <div className="bg-red-500 py-20 text-center text-white font-black">
            {/*  */}
            تنظیمات فوتر
          </div>
        </Link>
      </div>
    </>
  );
}
