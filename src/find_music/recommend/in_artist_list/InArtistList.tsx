import { useEffect, useState } from "react";
import { ArtistModel, ArtistResModel } from "../../../model/model";
import request from "../../../utils/request";
import "./InArtistList.css";

export function InArtistList() {
  const [artistList, setArtistList] = useState<ArtistModel[]>([]);


  useEffect(() => {
    request({
      url: "/artist/list",
      params: {
        limit: 5,
        type: -1,
      },
    }).then((res: ArtistResModel) => {
      setArtistList(res.artists);
    });
  }, []);

  return (
    <div className="in-artist-list-main">
      <h3 className="in-artist-list-header">
        <span>入驻歌手</span>
        <a href="/discover/artist/signed/">查看全部 &#62;</a>
      </h3>
      {artistList.map((item, index) => (
        <a className="in-artist-list-item" key={index}>
          <div
            className="in-artist-list-item-img"
            title={item.name}
            style={{
              background: `url(${item.picUrl}) center center / cover no-repeat`,
            }}
          ></div>
            <div className="in-artist-list-item-info">
                <h5>{item.name}</h5>
                <div>{item.briefDesc}</div>
            </div>
        </a>
      ))}
      <a className="in-artist-list-footer-btn">申请成为网易音乐人</a>
    </div>
  );
}
