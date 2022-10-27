import { useState } from "react";
import { Link } from "react-router-dom";
import { MusicDetail } from "../../detail/music_detail/MusicDetail";
import { ArtistMain } from "../artist_main/ArtistMain";
import { Recommend } from "../recommend/Recommend";
import "./SecondBar.css";

export function SecondBar() {
  const [currentItem, setCurrentItem] = useState(0);

  return (
    <div className="second-bar">
      <ul>
        {secondBarList
          .filter((item) => item.name)
          .map((item, index) => (
            <li
              className={`${currentItem === index ? "checked" : ""}`}
              key={index}
            >
              <Link to={item.link} onClick={() => setCurrentItem(index)}>
                {item.name}
                {item.showIcon && <span></span>}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export const secondBarList = [
  {
    name: "推荐",
    link: "",
    component: <Recommend />,
  },
  {
    name: "排行榜",
    link: "rankList",
  },
  {
    name: "歌单",
    showIcon: true,
    link: "songList",
  },
  {
    name: "主播电台",
    link: "hostAndRadio",
  },
  {
    name: "歌手",
    link: "singer",
  },
  {
    name: "新碟上架",
    link: "newSong",
  },
  {
    link: "artist",
    component: <ArtistMain />,
  },
  {
    link: "song",
    component: <MusicDetail />
  },
];
