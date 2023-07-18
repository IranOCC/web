"use client";

import PanelCard from "@/components/@panel/Card";
import GridList from "@/components/@panel/GridList";
import Image from "next/image";

export default async function Page() {
  return (
    <>
      <div className="p-4 pt-0">
        <PanelCard title="لیست فایل ها">
          <GridList
            //
            endpoint="storage"
            ItemComponent={({ value }) => (
              <Image
                //
                fill
                src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + value.path}
                alt={value.alt}
                title={value.title}
              />
            )}
          />
        </PanelCard>
      </div>
    </>
  );
}
