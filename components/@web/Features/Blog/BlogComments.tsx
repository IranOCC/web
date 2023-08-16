import { ThumbDownOutlined, ThumbUpOutlined, Reply, MarkUnreadChatAlt } from "@mui/icons-material";
import { Badge, Button, IconButton } from "@mui/material";
import { List, Skeleton, Avatar } from "antd";
import moment from "jalali-moment";
import { useState, useEffect } from "react";
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

const BlogComments = ({ id }: { id: string }) => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
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

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
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
                      <Button startIcon={<Reply />}>
                        <b>پاسخ</b>
                      </Button>
                      <Button color="warning" startIcon={<MarkUnreadChatAlt />} endIcon={"(2)"}>
                        <b>نمایش پاسخ ها</b>
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
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
                    </div>
                  </div>
                </div>
              }
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default BlogComments;
