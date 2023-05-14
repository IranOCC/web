import GridList from "@/components/@panel/GridList";
import PanelTab from "@/components/@panel/Tab";
import { Button } from "@/components/Button";
import Modal from "@/components/Modals";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import MediaHandler from ".";

export default function MediaLibrary({ open, setOpen, uploadPath, setSelectFiles }: any) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState<string | null>(null);

  const onSubmit = async () => {
    // setSelectFiles(selected);
  };

  const api = useAxiosAuth();
  const getData = async () => {
    try {
      const { data } = await api.get("/estate/category/assignList");
      setCategories(data);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Modal
        //
        open={open}
        // title="کتابخانه"
        setOpen={(v: boolean) => setOpen(v)}
      >
        <PanelTab
          //
          data={[
            {
              title: "انتخاب از کتابخانه",
              content: (
                <GridList
                  //
                  endpoint="storage"
                />
              ),
            },
            {
              title: "آپلود",
              content: (
                <MediaHandler
                  //
                  fromLibrary={false}
                  onChange={(v: any) => console.log(v)}
                  uploadPath={uploadPath}
                />
              ),
            },
          ]}
        />

        <Button
          //
          title="انتخاب"
          type="button"
          disabled={!selected}
          noSpace
          onClick={onSubmit}
        />
      </Modal>
    </>
  );
}
