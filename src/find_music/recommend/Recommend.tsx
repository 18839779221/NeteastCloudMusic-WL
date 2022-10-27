import React from "react";
import { Banner } from "./banner/Banner";
import { HotRecommendList } from "./hot_recommend_list/HotRecommendList";
import { InArtistList } from "./in_artist_list/InArtistList";
import { ListWrapper } from "./list_wrapper/ListWrapper";
import { NewestAlbum } from "./newest_album/NewestAlbum";
import "./Recommend.css";

export class Recommend extends React.Component {
  render() {
    return (
      <div className="recommend-main">
        <Banner />
        <div className="recommend-content"  style={{height: '100%'}}>
          <div className="recommend-left">
            <ListWrapper
              title="热门推荐"
              itemList={hotRecommendItemList}
              moreLink="/discover/playlist/"
            >
              <HotRecommendList maxItemCount={8}/>
            </ListWrapper>
            <ListWrapper title="新碟上架" moreLink="/discover/album">
              <NewestAlbum/>
            </ListWrapper>
            <ListWrapper title="榜单" moreLink="/discover/toplist"></ListWrapper>
          </div>
          <div className="recommend-right">
            <div className="login-tips">
              <div className="login-tips-text">
              登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
              </div>
              <div className="login-tips-btn">用户登录</div>
            </div>
            <InArtistList/>
          </div>
        </div>
      </div>
    );
  }
}

const hotRecommendItemList = [
  {
    name: "华语",
    link: "#",
  },
  {
    name: "流行",
    link: "#",
  },
  {
    name: "摇滚",
    link: "#",
  },
  {
    name: "民谣",
    link: "#",
  },
  {
    name: "电子",
    link: "#",
  }
];
