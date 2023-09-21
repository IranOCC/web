import Logo from "@/assets/images/logo.png";
import SearchBox from "@/components/@web/Features/@common/SearchBox";
import ClientSide from "@/components/@web/Features/Home/ClientSide";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const items = [
    {
      title: "ویژه",
      link: "/property?filter[vip]=true",
    },
    {
      title: "زمین",
      link: "/property?filter[category]=645cd1554b4819ffd958c958",
    },
    {
      title: "ویلا",
      link: "/property?filter[category]=645cd0444b4819ffd958c940",
    },
    {
      title: "آپارتمان",
      link: "/property?filter[category]=645cd1214b4819ffd958c955",
    },
    {
      title: "تجاری",
      link: "/property?filter[category]=645cd1754b4819ffd958c95b",
    },
    {
      title: "هکتاری",
      link: "/property?filter[category]=645cd1844b4819ffd958c95e",
    },
    {
      title: "ساحلی",
      link: "/property?filter[features]=645d0e6298a6fe36672b5738",
    },
    {
      title: "جنگلی",
      link: "/property?filter[features]=645d0e7598a6fe36672b573c",
    },
    {
      title: "اجاره سالانه",
      link: "/property?filter[annualRent]=true",
    },
    {
      title: "اجاره شبانه",
      link: "/property?filter[dailyRent]=true",
    },
    {
      title: "تهاتر",
      link: "/property?filter[barter]=true",
    },
    {
      title: "معاوضه",
      link: "/property?filter[change]=true",
    },
  ];

  return (
    <div className="flex h-auto min-h-full flex-col items-center justify-between bg-gray-200 px-4 pb-16 md:bg-transparent md:pb-4">
      <div className="sticky top-0 z-10 flex w-full flex-col items-center gap-4 bg-gray-200 px-3 py-5 pt-5 md:bg-white">
        <Image src={Logo} alt="logo" />
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-xl font-extrabold">املاک اکازیون</h1>
          <h2 className="text-center text-lg font-bold">بزرگترین مرکز اطلاعات املاک شمال کشور</h2>
        </div>
        <SearchBox />
      </div>
      <div className="flex max-w-5xl flex-wrap justify-center gap-3 py-8 sm:gap-4">
        {items.map(({ title, link }, idx) => {
          return (
            <div key={idx} className="relative overflow-hidden rounded-2xl">
              <Link href={link} role="link">
                <h3 className="w-40 truncate bg-white px-3 py-6 text-center text-base font-semibold transition-colors duration-500 hover:bg-secondary sm:w-56 sm:py-8 sm:text-lg sm:font-bold md:bg-gray-200">{title}</h3>
              </Link>
            </div>
          );
        })}
      </div>
      <ClientSide />
      <div />
    </div>
  );
}
