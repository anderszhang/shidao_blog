import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "文章列表",
    icon: "list",
    link: "/timeline/",
  },
  {
    text: "标签",
    icon: "tag",
    link: "/tag/",
  },
  {
    text: "学习笔记",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
     
    ],
  },
  "/intro"
]);
