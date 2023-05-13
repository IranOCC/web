import { Button } from "@/components/Button";
import Modal from "@/components/Modals";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useEffect, useState } from "react";

export default function EstateSetCategoryModal({ open, setOpen, setCategory }: any) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState<string | null>(null);

  const onSubmit = async () => {
    setCategory(selected);
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
        title="انتخاب دسته ملک"
        closeButton={false}
      >
        <div className="grid grid-cols-2 gap-4 py-4">
          {categories.map(({ value, title }: { value: string; title: string }, index) => {
            return (
              <>
                <div
                  //
                  className={(selected === value ? "bg-yellow-300 text-white" : "bg-slate-100 text-slate-800") + " py-6 cursor-pointer font-semibold transition-colors hover:bg-yellow-300 hover:text-white rounded text-center flex justify-center items-center"}
                  onClick={() => setSelected(value)}
                  title={title}
                  key={value}
                >
                  {/*  */}
                  {title}
                </div>
              </>
            );
          })}
        </div>

        <Button
          //
          title="ثبت و ادامه"
          type="button"
          disabled={!selected}
          noSpace
          onClick={onSubmit}
        />
      </Modal>
    </>
  );
}
