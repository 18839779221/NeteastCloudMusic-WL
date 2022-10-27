import "./TopBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MyMusic } from "../my_music/MyMusic";
import { FindMusic } from "../find_music/FindMusic";
import { PhoneLoginModal } from "../login/phone_login/PhoneLoginModal";
import ReactDOM from "react-dom";

export function TopBar() {
  const [currentItem, setCurrentItem] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const loginModal = () => {
    console.log("create-modal")
    const rootNode = document.querySelector(".app-root")
    if (rootNode) {
      return ReactDOM.createPortal(<PhoneLoginModal
        visible={showLoginModal}
        close={() => setShowLoginModal(false)}
      ></PhoneLoginModal>,
        rootNode)
    }
    return null
  }

  return (
    <div className="top-bar">
      <div className="logo"></div>
      <ul className="top-bar-list">
        {topBarList.map((item, index) => (
          <li
            className={`top-bar-list-item ${currentItem === index ? "checked" : ""
              }`}
            key={index}
          >
            <Link to={item.link} onClick={() => setCurrentItem(index)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="search-bar">
        <input type="text" placeholder="音乐/视频/电台/用户"></input>
      </div>
      <a className="btn-login" onClick={() => setShowLoginModal(true)}>
        登录
      </a>
      {showLoginModal && loginModal()}
    </div>
  );
}

export const topBarList = [
  {
    name: "发现音乐",
    link: "",
    component: <FindMusic />,
  },
  {
    name: "我的音乐",
    link: "myMusic",
    component: <MyMusic />,
  },
  {
    name: "关注",
    link: "attention",
  },
  {
    name: "商城",
    link: "store",
  },
  {
    name: "音乐人",
    link: "musician",
  },
  {
    name: "下载客户端",
    link: "download",
  },
];
