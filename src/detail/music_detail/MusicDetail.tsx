import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LyricResModel, MusicDetailModel } from "../../model/model";
import {
  selectCurrentMusic,
  appendMusicAction,
} from "../../music_player/playMusicSlice";
import { preprocessLyric } from "../../service/LyricService";
import { getQueryObject } from "../../utils/format";
import request from "../../utils/request";
import "./MusicDetail.css";

export function MusicDetail() {
  const minLineToFold = 12; //需要折叠的最小行数

  let { id } = getQueryObject(null) as { id: string };
  let [musicDetail, setMusicDetail] = useState<MusicDetailModel | null>(null);
  let [isLyricFold, setIsLyricFold] = useState<boolean>(true);
  let [lyric, setLyric] = useState<string[]>([]);

  const dispatch = useDispatch();

  let currentMusic = useSelector(selectCurrentMusic);

  useEffect(() => {
    let resMusicDetail: MusicDetailModel | null = null;
    // 获取歌曲详情
    const musicDetailPromise = request({
      url: "/song/detail",
      params: {
        ids: id,
      },
    });

    // 获取歌词
    const lyricPromise = request({
      url: "/lyric",
      params: {
        id: id,
      },
    });

    musicDetailPromise.then((res: { songs?: MusicDetailModel[] }) => {
      if (res.songs && res.songs?.length !== 0) {
        resMusicDetail = res.songs[0];
        setMusicDetail(res.songs[0]);
      }
    });

    lyricPromise.then((res: LyricResModel) => {
      if (res?.lrc?.lyric) {
        setLyric(preprocessLyric(res?.lrc?.lyric).map((item) => item.lyric));
      }
    });
  }, [id]);

  const playCurrentMusic = () => {
    if (musicDetail) {
      dispatch(appendMusicAction({ music: musicDetail, ifSwitchPlay: true }));
    }
  };

  const lyricView = () => {
    const toShowLyric = isLyricFold ? lyric.slice(0, 12) : lyric;

    return (
      <Fragment>
        <div className="mdrmi-lyric">
          {toShowLyric.map((lyricItem) => (
            <Fragment key={lyricItem}>
              {lyricItem} <br />
            </Fragment>
          ))}
          {lyric.length > minLineToFold && (
            <a
              className="mdrmi-desc-a"
              onClick={(e) => setIsLyricFold(!isLyricFold)}
            >
              {isLyricFold ? "展开" : "收起"}
            </a>
          )}
        </div>
      </Fragment>
    );
  };

  return (
    <div className="music-detail-main">
      <div className="music-detail-content">
        <div className="music-detail-left">
          <img
            className={`music-detail-left-cd ${
              musicDetail?.id === currentMusic?.id
                ? "music-detail-left-cd-rotate"
                : ""
            }`}
            src={musicDetail?.al.picUrl}
            alt="cd"
          />
          <div className="music-detail-right-music-info">
            <div className="mdrmi-title-container">
              <div className="mdrmi-type-tag">单曲</div>
              <div className="mdrmi-title">{musicDetail?.name}</div>
            </div>
            <p className="mdrmi-desc">
              歌手：
              {musicDetail?.ar.map((item, index) => {
                return (
                  <Fragment key={index}>
                    {index !== 0 && <span>/</span>}
                    <a href="/#" key={item.id}>
                      {item.name}
                    </a>
                  </Fragment>
                );
              })}
            </p>
            <p className="mdrmi-desc">
              专辑：<a href="/#">{musicDetail?.al.name}</a>
            </p>

            <div className="mdrmi-opt-list">
              <div
                className="mdrmi-opt-btn-play"
                onClick={(e) => playCurrentMusic()}
              >
                播放
              </div>
              <div className="mdrmi-opt-btn">收藏</div>
              <div className="mdrmi-opt-btn">分享</div>
              <div className="mdrmi-opt-btn">下载</div>
              <div className="mdrmi-opt-btn">评论</div>
            </div>
            {lyricView()}
          </div>
        </div>
        <div className="music-detail-right"></div>
      </div>
    </div>
  );
}
