import { ThumbDownOutlined, ThumbUpOutlined, Reply, MarkUnreadChatAlt } from "@mui/icons-material";
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
import { Phone } from "@/types/interfaces";

type IProps = { id: string; openNewComments: boolean; onlyUsersNewComments: boolean; showComments: boolean; showUnconfirmedComments: boolean };
const BlogComments = ({ id, openNewComments, onlyUsersNewComments, showComments, showUnconfirmedComments }: IProps) => {
  return (
    <>
      {openNewComments ? <CommentForm onlyUsers={onlyUsersNewComments} /> : <Empty description="در این لحظه امکان دریافت نظرات وجود ندارد" />}
      {showComments ? <CommentsList /> : null}
    </>
  );
};

export default BlogComments;

const CommentForm = ({ onlyUsers }: { onlyUsers: boolean }) => {
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
    try {
      await api.post(`/blog/comment/`, data);
      toast.success("با تشکر از شما! گزارش شما با موفقیت ثبت شد و پس از بازنگری اصلاحات انجام خواهد شد");
      onClose();
    } catch (error) {
      onClose();
    }
  };

  const onClose = () => {
    resetField("name");
    resetField("phone");
    resetField("sendUnknown");
    resetField("content");
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
            <h3 className="text-sm font-bold">ثبت دیدگاه جدید</h3>
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
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const CommentsList = () => {
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);

  useEffect(() => {
    // fetch(fakeDataUrl)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setInitLoading(false);
    //     setData(res.results);
    //     setList(res.results);
    //   });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(data.concat([...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))));
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event("resize"));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>موارد بیشتر ...</Button>
      </div>
    ) : null;

  const router = useRouter();
  const onReplyTo = () => {
    router.push("#commentform");
  };

  return (
    <>
      <hr />
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        locale={{ emptyText: <Empty description="تاکنون نظری ثبت نشده است" >
        اولین شخصی باشید که نظر می دهید
        </Empty> }}
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
                avatar={<Avatar src={item.picture.large} />}
                title={
                  <div className="flex flex-row gap-2">
                    <b>ابی حامدی</b>|<span className="text-gray-500">{moment().locale("fa").format("DD MMM YYYY HH:mm:ss")}</span>
                  </div>
                }
                description={
                  <div className="flex flex-col items-start gap-2">
                    <p>این صدای منه های این صدای منه وای</p>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex flex-row gap-2">
                        <Button startIcon={<Reply />} onClick={() => onReplyTo()}>
                          <b>پاسخ</b>
                        </Button>
                        <Button color="warning" startIcon={<MarkUnreadChatAlt />} endIcon={"(2)"}>
                          <b>نمایش</b>
                        </Button>
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
