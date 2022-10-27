import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  HotRecommendModel,
  HotRecommendResModel,
  PlayListResModel,
} from "../../../model/model";
import { updatePlayListAction } from "../../../music_player/playMusicSlice";
import { formatCountToChinese } from "../../../utils/format";
import request from "../../../utils/request";
import "./HotRecommendList.css";

export function HotRecommendList(props: { maxItemCount: number }) {
  const [recommendList, setRecommendList] = useState<HotRecommendModel[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    request({
      url: "/personalized",
    }).then((res: HotRecommendResModel) => {
      setRecommendList(res.result.slice(0, props.maxItemCount));
    });
  }, []);

  function playCurrentList(playListId: number) {
    request({
      url: "/playlist/detail",
      params: {
        id: playListId,
      },
    }).then((res: PlayListResModel) => {
      dispatch(updatePlayListAction(res.playlist.tracks));
    });
  }

  return (
    <div className="recommend-list">
      {recommendList.map((item, index) => (
        <div className="recommend-list-item" key={index}>
          <div
            className="recommend-list-item-img"
            title={item.name}
            style={{
              background: `url(${item.picUrl}) center center / cover no-repeat`,
            }}
          >
            <div className="recommend-list-item-play">
              <div>{formatCountToChinese(item.playCount, 2)}</div>
              <svg aria-hidden="true" onClick={() => playCurrentList(item.id)}>
                <use xlinkHref="#icon-shipinbofangshibofang"></use>
              </svg>
            </div>
          </div>
          <a className="recommend-list-item-title">{item.name}</a>
        </div>
      ))}
    </div>
  );
}
