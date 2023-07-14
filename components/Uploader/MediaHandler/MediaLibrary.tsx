import GridList from "@/components/@panel/GridList";
import PanelTab from "@/components/@panel/Tab";
import { Button } from "@/components/@panel/Button";
import IconButton from "@/components/@panel/Button/IconButton";
import Modal from "@/components/Modals";
import { useEffect, useState } from "react";
import MediaHandler from ".";
import Image from "next/image";
import { Add, Cancel } from "@mui/icons-material";
import { StorageFile } from "@/types/interfaces";

export default function MediaLibrary({ open, setOpen, uploadPath, setSelectFiles, maxFile }: any) {
  const [selected, setSelected] = useState<StorageFile[]>([]);

  useEffect(() => {
    setSelected([]);
  }, [open]);

  return (
    <>
      <Modal
        //
        open={open}
        setOpen={(v: boolean) => setOpen(v)}
      >
        {!!selected.length && (
          <>
            <div className="">
              <div className="sticky overflow-y-hidden mb-2">
                <div className="w-full h-20 flex items-center gap-2">
                  {/*  */}
                  {selected.map((file, index) => {
                    return (
                      <>
                        <div key={index} className="relative overflow-hidden aspect-square h-full min-w-max" tabIndex={index}>
                          <Image
                            //
                            fill
                            src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + file.path}
                            alt={file.alt}
                            title={file.title}
                          />
                          <Cancel
                            //
                            onClick={() => {
                              selected.splice(index, 1);
                              setSelected([...selected]);
                            }}
                            className="absolute text-red-500 top-1 right-1 cursor-pointer hover:text-white"
                          />
                        </div>
                      </>
                    );
                  })}
                  {/*  */}
                </div>
              </div>
              <Button
                //
                title="ثبت و ادامه"
                type="button"
                disabled={!selected.length}
                onClick={() => setSelectFiles(selected)}
                noSpace
              />
              <hr className="my-3" />
            </div>
          </>
        )}

        <PanelTab
          //
          data={[
            {
              title: "انتخاب از کتابخانه",
              content: (
                <GridList
                  //
                  endpoint="storage"
                  ItemComponent={({ value }) => (
                    <>
                      <Image
                        //
                        fill
                        src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + value.path}
                        alt={value.alt}
                        title={value.title}
                      />
                      <IconButton
                        //
                        icon={<Add />}
                        onClick={() => {
                          setSelected((selected) => [...selected, value]);
                        }}
                        className="!absolute bottom-2 left-2"
                      />
                    </>
                  )}
                />
              ),
            },
            {
              title: "آپلود",
              content: (
                <MediaHandler
                  //
                  fromLibrary={false}
                  onChange={(value: StorageFile[]) => setSelected((selected) => [...selected, ...value])}
                  uploadPath={uploadPath}
                  noSpace
                  showFilesList={false}
                  showUploadList
                />
              ),
            },
          ]}
        />
      </Modal>
    </>
  );
}
