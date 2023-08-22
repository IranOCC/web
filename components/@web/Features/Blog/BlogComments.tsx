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
import { Phone, StorageFile, User } from "@/types/interfaces";
import stc from "string-to-color";
import Image from "next/image";

type IProps = { id: string; openNewComments: boolean; onlyUsersNewComments: boolean; showComments: boolean; showUnconfirmedComments: boolean };
const BlogComments = ({ id, openNewComments, onlyUsersNewComments, showComments, showUnconfirmedComments }: IProps) => {
  const [update, setUpdate] = useState([true]);
  const [replyTo, setReplyTo] = useState<DataType | null>(null);
  const { user, isLogin } = useContext(CurrentUserContext) as CurrentUserContextType;

  const canWriteComment = openNewComments && (onlyUsersNewComments ? isLogin : true);

  return (
    <>
      {openNewComments ? (
        <CommentForm
          //
          id={id}
          replyTo={replyTo}
          setUpdate={setUpdate}
          canWriteComment={canWriteComment}
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
          canWriteComment={canWriteComment}
        />
      ) : null}
    </>
  );
};

export default BlogComments;

const CommentForm = ({ id, canWriteComment, setUpdate, replyTo, setReplyTo }: { id: string; canWriteComment: boolean; setUpdate: (d: any) => void; replyTo: DataType | null; setReplyTo: (d: DataType | null) => void }) => {
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
    if (!canWriteComment) return;
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
    resetField("name", { keepDirty: true, defaultValue: user?.fullName || "" });
    resetField("phone", { keepDirty: true, defaultValue: (!!(user?.phone as Phone)?.value && `0${(user?.phone as Phone)?.value?.substring(3)}`) || "" });
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

  if (!canWriteComment) {
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
            disabled={isLogin}
            loading={isLoading || isSubmitting}
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
            disabled={isLogin}
            loading={isLoading || isSubmitting}
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
            loading={isLoading || isSubmitting}
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
            loading={isLoading || isSubmitting}
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
  responses?: DataType[];
}

const size = 3;

const CommentsList = ({ id, update, canWriteComment, setReplyTo }: { id: string; canWriteComment: boolean; update: any; setReplyTo: (d: DataType) => void }) => {
  const [count, setCount] = useState<number>(0);

  const api = useAxiosAuth();

  return (
    <>
      <hr className="my-2" />
      <a className="col-span-full py-2">
        <h3 className="text-sm font-bold">دیدگاه ها ({count.toLocaleString("fa")})</h3>
      </a>
      <CommentsListData
        //
        postID={id}
        update={update}
        canWriteComment={canWriteComment}
        setReplyTo={setReplyTo}
        setCount={setCount}
      />
    </>
  );
};

const CommentsListData = ({ postID, update, replyTo, canWriteComment, setReplyTo, setCount }: { postID: string; canWriteComment: boolean; replyTo?: string; update: any; setReplyTo: (d: DataType) => void; setCount?: (d: number) => void }) => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [showReply, setShowReply] = useState(false);

  const api = useAxiosAuth();

  const getInitData = async () => {
    setInitLoading(true);
    const _params = { current: 1, size, filter: { replyTo } };
    try {
      const { data: res } = await api.get(`/blog/comment/${postID}`, { params: _params });
      setInitLoading(false);
      setTotal(res?.total || 0);
      if (!!setCount) setCount(res?.total || 0);
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
    setList(data.concat([...new Array(size)].map(() => ({ loading: true, name: "", content: "", createdAt: "", _id: "", responses: [] }))));
    const _params = { current: current + 1, size, filter: { replyTo } };
    try {
      const { data: res } = await api.get(`/blog/comment/${postID}`, { params: _params });
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
    if (!canWriteComment) return;
    setReplyTo(data);
    router.push("#commentform");
  };

  return (
    <>
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
                avatar={
                  <Avatar
                    src={item?.createdBy?.avatar && <Image src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + (item?.createdBy?.avatar as StorageFile).path} alt={(item?.createdBy?.avatar as StorageFile).alt} width={100} height={100} className="aspect-square" />}
                    style={{ background: stc(item?.createdBy?.fullName || item.name) }}
                    className="!border-none align-middle"
                  >
                    {(item?.createdBy?.fullName || item.name).slice(0, 1)}
                  </Avatar>
                }
                title={
                  <div className="flex flex-row gap-2">
                    <b>{item?.createdBy?.fullName || item.name}</b>|<span className="text-gray-500">{item?.createdAt && moment(item.createdAt).locale("fa").format("DD MMM YYYY HH:mm:ss")}</span>
                  </div>
                }
                description={
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-black">{item.content}</p>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex flex-row gap-2">
                        {canWriteComment && (
                          <Button startIcon={<Reply />} onClick={() => onReplyTo(item)}>
                            <b>پاسخ</b>
                          </Button>
                        )}
                        {!!item.responses?.length && (
                          <Button color="success" startIcon={<MarkUnreadChatAlt />} onClick={() => setShowReply((pv) => !pv)}>
                            <b>{showReply ? `پنهان کردن پاسخ ها` : `پاسخ ها (${item.responses.length.toLocaleString("fa")})`}</b>
                          </Button>
                        )}
                      </div>
                    </div>
                    {!!item.responses?.length && showReply && (
                      <div className="w-full">
                        <CommentsListData
                          //
                          postID={postID}
                          update={update}
                          canWriteComment={canWriteComment}
                          replyTo={item._id}
                          setReplyTo={setReplyTo}
                          setCount={setCount}
                        />
                      </div>
                    )}
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
