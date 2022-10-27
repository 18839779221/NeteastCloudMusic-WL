import { off } from "process";
import { useEffect, useState } from "react";
import { AlbumModel, NewestAlbumModel } from "../../../model/model";
import request from "../../../utils/request";
import "./NewestAlbum.css";

export function NewestAlbum() {
  const [albumList, setAlbumList] = useState<AlbumModel[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const maxSize = 5;

  useEffect(() => {
    request({
      url: "/album/newest",
    }).then((res: NewestAlbumModel) => {
      setAlbumList(res.albums.slice(0, 10));
    });
  }, []);

  function turnPage(up: boolean) {
    let offset = up ? maxSize : -maxSize;
    let newIndex = startIndex + offset;
    newIndex = Math.min(Math.max(0, newIndex), albumList.length - maxSize - 1);
    setStartIndex(newIndex)
    let itemWidth = document.getElementsByClassName("newest-album-item")[0].clientWidth
    offset = up ? itemWidth : -itemWidth;
    document.getElementsByClassName("newest-album-list")[0].scrollBy(offset, 0)
  }

  return (
    <div className="newest-album-main">
      <div className="newest-album-switch-left" onClick={() => turnPage(false)}></div>
      <div className="newest-album-list">
        {albumList.map((item, index) => (
          <div className="newest-album-item" key={index}>
            <div
              className="newest-album-item-img"
              title={item.name}
              style={{
                background: `url(${item.picUrl}) center center / cover no-repeat`,
              }}
            ></div>
            <a href="#">{item.name}</a>
            <a href="#" style={{ color: "#666666" }}>
              {item.artist.name || item.artists[0].name || ""}
            </a>
          </div>
        ))}
      </div>
      <div className="newest-album-switch-right" onClick={() => turnPage(true)}></div>
    </div>
  );
}
