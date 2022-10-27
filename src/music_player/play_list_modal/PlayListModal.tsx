import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { preprocessLyric } from "../../service/LyricService";
import { formatMsDurationMMSS } from "../../utils/format";
import {
  selectCurrentMusic,
  selectPlayMusic,
  switchMusicAction,
} from "../playMusicSlice";
import "./PlayListModal.css";
/**
 *
 * 播放列表
 */
interface Props {
  visible: boolean;
  close: () => void;
  currentTime: number; // 当前歌曲的播放时间，用于确定当前歌词位置
}

export const PlayListModal: React.FC<Props> = (props) => {
  const currentMusic = useSelector(selectCurrentMusic);
  const playMusic = useSelector(selectPlayMusic);
  const dispatch = useDispatch();

  useEffect(() => {
    // 点击空白区域关闭
    const dismissOnClickOutSide = (event: Event) => {
      const targetNode = event?.target;
      if (targetNode instanceof HTMLElement) {
        const playListModalNode = document.querySelector(
          ".play-list-container"
        );
        if (
          targetNode !== playListModalNode &&
          !playListModalNode?.contains(targetNode)
        ) {
          props.close();
          event.preventDefault();
        }
      }
    };

    document.addEventListener("click", dismissOnClickOutSide, true);

    return () => {
      document.removeEventListener("click", dismissOnClickOutSide);
    };
  }, []);

  const switchPlayMusic = (index: number) => {
    dispatch(switchMusicAction(index));
  };

  return props.visible ? (
    <div className="play-list-container">
      <div className="play-list-header">
        <div className="play-list-header-left">
          <span>播放列表&nbsp;{playMusic?.playList?.length}</span>
          <a>清除</a>
        </div>
        <div className="play-list-header-right">{currentMusic?.name}</div>
        <a className="play-list-header-close" onClick={props.close}>
          X
        </a>
      </div>
      <div className="play-list-content">
        <div className="play-list-content-left">
          {playMusic.playList.map((item, index) => (
            <div
              className={`play-list-item ${
                index === playMusic.currentIndex ? "play-list-item-current" : ""
              }`}
              key={index}
              onClick={() => switchPlayMusic(index)}
            >
              <div className="play-list-item-music-name">{item?.name}</div>
              <a
                className="play-list-item-artist"
                title={item.ar.map((item) => item.name).join("/")}
              >
                {item.ar.map((item) => item.name).join("/")}
              </a>
              <div className="play-list-item-duration">
                {formatMsDurationMMSS(item?.dt)}
              </div>
            </div>
          ))}
        </div>
        <div className="play-list-content-right">
          {preprocessLyric(currentMusic?.lyric)?.map((item) => (
            <p
              className={
                item.time <= props.currentTime &&
                item.nextTime > props.currentTime
                  ? "play-list-lyric-current"
                  : "play-list-lyric-normal"
              }
            >
              {item.lyric}
            </p>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};
