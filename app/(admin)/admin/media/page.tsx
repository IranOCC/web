"use client";

import PanelCard from "@/components/@panel/Card";
import GridList from "@/components/@panel/GridList";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import NextImage from "next/image";

export default function Page() {
  return (
    <>
      <div className="p-4 pt-0">
        <PanelCard title="لیست فایل ها">
          <GridList
            //
            endpoint="storage"
            ItemComponent={({ value }) => (
              <Card isFooterBlurred isPressable className="h-full w-full" radius="none">
                <Image
                  //
                  isZoomed
                  as={NextImage}
                  width={512}
                  height={512}
                  className="h-full w-full"
                  radius="none"
                  classNames={{ wrapper: "!max-w-none w-full h-full", zoomedWrapper: "h-full" }}
                  src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + value.path}
                  alt={value.alt}
                  title={value.title}
                />
                <CardFooter className="absolute bottom-1 z-10 ms-1 w-[calc(100%_-_8px)] justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
                  <p className="text-tiny text-white/80">آپلود: {value?.uploadedBy?.fullName || "-"}</p>
                  <Button className="bg-black/20 text-tiny text-white" variant="flat" color="default" radius="lg" size="sm">
                    جزئیات
                  </Button>
                </CardFooter>
              </Card>
            )}
          />
        </PanelCard>
      </div>
    </>
  );
}
