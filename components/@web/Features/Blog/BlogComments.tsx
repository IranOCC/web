import { ThumbDownOutlined, ThumbUpOutlined, Reply, MarkUnreadChatAlt, CancelOutlined, Cancel, Chat } from "@mui/icons-material";
import { Badge, Button, IconButton } from "@mui/material";
import { List, Skeleton, Avatar, Empty } from "antd";
import moment from "jalali-moment";
import { useState, useEffect, useContext } from "react";
import { WebInput } from "../../Input";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { CommentFormData } from "@/types/formsData";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { WebButton } from "../../Button";
import Link from "next/link";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import { Phone, User } from "@/types/interfaces";

type IProps = { id: string; openNewComments: boolean; onlyUsersNewComments: boolean; showComments: boolean; showUnconfirmedComments: boolean };
const BlogComments = ({ id, openNewComments, onlyUsersNewComments, showComments, showUnconfirmedComments }: IProps) => {
  const [update, setUpdate] = useState([true]);
  const [replyTo, setReplyTo] = useState<DataType | null>(null);

  return (
    <>
      {openNewComments ? (
        <CommentForm
          //
          id={id}
          replyTo={replyTo}
          setUpdate={setUpdate}
          onlyUsers={onlyUsersNewComments}
          setReplyTo={setReplyTo}
        />
      ) : (
        <Empty description="در این لحظه امکان دریافت نظرات وجود ندارد" />
      )}
      {showComments ? (
        <CommentsList
          //
          id={id}
          setReplyTo={setReplyTo}
          update={update}
        />
      ) : null}
    </>
  );
};

export default BlogComments;

const CommentForm = ({ id, onlyUsers, setUpdate, replyTo, setReplyTo }: { id: string; onlyUsers: boolean; setUpdate: (d: any) => void; replyTo: DataType | null; setReplyTo: (d: DataType | null) => void }) => {
  const { user, isLogin } = useContext(CurrentUserContext) as CurrentUserContextType;

  const form = useForm<CommentFormData>();
  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form;

  const api = useAxiosAuth();
  const onSubmit = async (data: CommentFormData) => {
    if (!!replyTo) data.replyTo = replyTo._id;
    try {
      await api.post(`/blog/comment/${id}`, data);
      toast.success("نظر شما ثبت شد");
      onClose();
    } catch (error) {
      onClose();
    }
  };

  const onClose = () => {
    setUpdate([true]);
    resetField("name");
    resetField("phone");
    resetField("content");
    resetField("replyTo");
    setReplyTo(null);
  };

  useEffect(() => {
    register("name", {
      //
      required: "نام الزامی است",
    });
    register("phone", {
      //
      required: "شماره تماس الزامی است",
    });
    register("content", {
      //
      required: "متن نظر الزامی است",
      minLength: { value: 10, message: "حداقل باید 10 کاراکتر باشد" },
      maxLength: { value: 1000, message: "حداکثر باید 1000 کاراکتر باشد" },
    });
  }, []);

  if (onlyUsers && !isLogin) {
    return (
      <>
        <Empty
          description={
            <>
              برای ثبت نظر باید وارد شوید
              <Button color="info" LinkComponent={Link} href="/auth">
                (ورود / عضویت)
              </Button>
            </>
          }
        />
      </>
    );
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="absolute -top-[3.25rem] w-full" id="commentform" />
          <a href="#commentform" className="col-span-full py-2">
            <h3 className="flex items-center gap-1 text-sm font-bold">
              {replyTo ? (
                <>
                  <i className="text-gray-400">
                    <Reply />
                  </i>
                  پاسخ به نظر <span className="text-blue-400">{replyTo?.name}</span>
                  <button type="button" onClick={() => setReplyTo(null)} className="transation-all text-gray-200 hover:text-red-500">
                    <Cancel fontSize="small" />
                  </button>
                </>
              ) : (
                <>
                  <i className="text-gray-400">
                    <Chat />
                  </i>
                  ثبت دیدگاه جدید
                </>
              )}
            </h3>
            {replyTo && <div className="mt-2 w-full truncate rounded-lg border-gray-900 bg-blue-100 p-2 text-sm text-black/75">{replyTo.content}</div>}
          </a>
          <WebInput
            //
            control={control}
            name="name"
            placeholder="نام"
            error={errors.name?.message}
            disabled={isLoading || isSubmitting || isLogin}
            defaultValue={user?.fullName || ""}
            noSpace
            containerClassName="col-span-1"
          />
          <WebInput
            //
            control={control}
            name="phone"
            placeholder="شماره تماس"
            direction="ltr"
            type="tel"
            patternFormatProps={{
              format: "###########",
              allowEmptyFormatting: false,
              mask: " ",
            }}
            error={errors.phone?.message}
            disabled={isLoading || isSubmitting || isLogin}
            defaultValue={(!!(user?.phone as Phone)?.value && `0${(user?.phone as Phone)?.value?.substring(3)}`) || ""}
            noSpace
            containerClassName="col-span-1"
          />
          <WebInput
            //
            control={control}
            name="content"
            placeholder="دیدگاه"
            error={errors.content?.message}
            disabled={isLoading || isSubmitting}
            multiline
            lines={4}
            noSpace
            containerClassName="col-span-full"
          />
          <WebButton
            //
            type="submit"
            title="ارسال"
            size="default"
            disabled={isLoading || isSubmitting}
            noSpace
          />
        </div>
      </form>
    </>
  );
};

interface DataType {
  name: string;
  content: string;
  pinned?: boolean;
  createdAt: string;
  createdBy?: User;
  _id: string;
  loading?: boolean;
  responses?: string[];
}

const size = 3;

const CommentsList = ({ id, update, setReplyTo }: { id: string; update: any; setReplyTo: (d: DataType) => void }) => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const api = useAxiosAuth();
  const getInitData = async () => {
    const _params = { current: 1, size };
    try {
      const { data: res } = await api.get(`/blog/comment/${id}`, { params: _params });
      setInitLoading(false);
      setTotal(res?.total || 0);
      setData(res?.items || []);
      setList(res?.items || []);
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    getInitData();
  }, [update]);
  const getMoreData = async () => {
    setLoading(true);
    setList(data.concat([...new Array(size)].map(() => ({ loading: true, name: "", content: "", createdAt: "", _id: "" }))));
    const _params = { current: current + 1, size };
    try {
      const { data: res } = await api.get(`/blog/comment/${id}`, { params: _params });
      const newData = data.concat(res?.items || []);
      setData(newData);
      setList(newData);
      setLoading(false);
      setCurrent((prev) => prev + 1);
      window.dispatchEvent(new Event("resize"));
    } catch (error) {
      //
    }
  };

  const getReply = async () => {
    const _params = { current: 1, size: 10, replyTo: "" };
    // try {
    //   const { data } = await api.get(`/blog/comment/${id}`, { params: _params });
    //   const newData = data.concat(data.items);
    //   setData(newData);
    //   setList(newData);
    //   setLoading(false);
    //   setCurrent((prev) => prev + 1);
    //   window.dispatchEvent(new Event("resize"));
    // } catch (error) {
    //   //
    // }
  };

  const loadMore =
    !initLoading && !loading && total > data.length ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={getMoreData}>موارد بیشتر ...</Button>
      </div>
    ) : null;

  const router = useRouter();
  const onReplyTo = (data: DataType) => {
    setReplyTo(data);
    router.push("#commentform");
  };

  return (
    <>
      <hr className="my-2" />
      <a className="col-span-full py-2">
        <h3 className="text-sm font-bold">دیدگاه ها ({total.toLocaleString("fa")})</h3>
      </a>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        locale={{ emptyText: <Empty description="تاکنون نظری ثبت نشده است">اولین شخصی باشید که نظر می دهید</Empty> }}
        renderItem={(item, idx) => (
          <List.Item
            //
            key={idx}
          >
            <Skeleton
              //
              avatar
              title={false}
              loading={item.loading}
              active
            >
              <List.Item.Meta
                //
                avatar={<Avatar />}
                title={
                  <div className="flex flex-row gap-2">
                    <b>{item.name}</b>|<span className="text-gray-500">{"--"}</span>
                  </div>
                }
                description={
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-black">{item.content}</p>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex flex-row gap-2">
                        <Button startIcon={<Reply />} onClick={() => onReplyTo(item)}>
                          <b>پاسخ</b>
                        </Button>
                        {!!item.responses?.length && (
                          <Button color="success" startIcon={<MarkUnreadChatAlt />} endIcon={"(2)"}>
                            <b>نمایش ({item.responses.length.toLocaleString("fa")})</b>
                          </Button>
                        )}
                      </div>
                      {/* <div className="grid grid-cols-2 gap-2">
                        <Badge
                          key={0}
                          badgeContent={4}
                          showZero
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <IconButton color="success" size="small">
                            <ThumbUpOutlined />
                          </IconButton>
                        </Badge>
                        <Badge
                          key={1}
                          badgeContent={1}
                          showZero
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <IconButton color="error" size="small">
                            <ThumbDownOutlined />
                          </IconButton>
                        </Badge>
                      </div> */}
                    </div>
                  </div>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};