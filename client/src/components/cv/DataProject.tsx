import cloneIncv from "../../assets/cloneIncv.jpg";
import filmCv from "../../assets/filmCv.jpg";
import shopcv from "../../assets/shopcv.jpg";

type TData = {
  img: string;
  title: string;
  content: string;
  linkGit: string;
  demo: string;
}[];

export const DataProject: TData = [
  {
    img: cloneIncv,
    title: "Clone instagram",
    content:
      "Clone instagram là một ứng dụng mạng xã hội cho phép người dùng chia sẻ ảnh và video, kết nối với bạn bè, gia đình và các người theo dõi khác.",
    linkGit: "https://github.com/TamLe2312/DuAnMau",
    demo: "https://github.com/TamLe2312/DuAnMau",
  },
  {
    img: shopcv,
    title: "WibuStore",
    content:
      "Một trang web bán mô hình anime là một nền tảng trực tuyến chuyên cung cấp các sản phẩm mô hình được lấy cảm hứng từ các nhân vật và cảnh trong anime. ",
    linkGit: "https://github.com/ccxtncntus/wibustore",
    demo: "https://github.com/ccxtncntus/wibustore",
  },
  {
    img: filmCv,
    title: "Nothing",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est ab quaerat corporis tenetur. Accusamus, ex?",
    linkGit: "https://github.com/ccxtncntus",
    demo: "https://github.com/ccxtncntus",
  },
];
