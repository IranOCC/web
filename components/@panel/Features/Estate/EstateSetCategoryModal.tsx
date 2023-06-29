import { Button } from "@/components/Button";
import Modal from "@/components/Modals";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function EstateSetCategoryModal({ open, setOpen, setCategory }: any) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setCategory(selected);
  };

  const api = useAxiosAuth();
  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/estate/category/assignList");
      setCategories(data);
      setLoading(false);
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
        loading={loading}
      >
        {!loading && (
          <>
            <RadioGroup value={selected} onChange={(value) => setSelected(value)}>
              <div className="grid grid-cols-2 gap-4 py-4">
                {categories.map(({ value, title }: { value: string; title: string }, index) => {
                  return (
                    <>
                      <RadioGroup.Option
                        //
                        value={value}
                        key={index}
                      >
                        {({ checked }) => <div className={"bg-slate-100 text-slate-800 py-6 cursor-pointer font-semibold transition-colors hover:bg-yellow-300 hover:text-white rounded text-center flex justify-center items-center" + (checked ? " bg-yellow-300 text-white" : "")}>{title}</div>}
                      </RadioGroup.Option>
                    </>
                  );
                })}
              </div>
            </RadioGroup>
            <Button
              //
              title="ثبت و ادامه"
              type="button"
              disabled={!selected}
              noSpace
              onClick={onSubmit}
            />
          </>
        )}
      </Modal>
    </>
  );
}
