import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dropWhile } from "lodash";
import { LyricResModel, MusicDetailModel } from "../model/model";
import request from "../utils/request";

export interface PlayListState {
  currentIndex: number;
  playList: MusicDetailModel[];
  // currentMusic?: MusicDetailModel,
}

const initialState: PlayListState = {
  currentIndex: 0,
  playList: [],
};

const playMusicSlice = createSlice({
  name: "playMusic",
  initialState: initialState,
  reducers: {
    // 切换播放音乐
    switchMusicAction: (state, action: PayloadAction<number>) => {
      let newIndex = action.payload;
      if (!state.playList || state.playList.length === 0) return;
      let length = state.playList.length;
      while (newIndex < 0) {
        newIndex += length;
      }
      newIndex = newIndex % length;
      state.currentIndex = newIndex;
    },
    // 更新播放列表
    updatePlayListAction: (
      state,
      action: PayloadAction<MusicDetailModel[]>
    ) => {
      state.playList = action.payload;
    },
    // 在当前歌单末尾添加音乐，ifSwitchPlay表示是否切换到当前歌曲
    appendMusicAction: (
      state,
      action: PayloadAction<{ music: MusicDetailModel; ifSwitchPlay: boolean }>
    ) => {
      // 删除队列中重复的item
      dropWhile(state.playList, (item) => item.id === action.payload.music.id);
      // 插入music
      state.playList.push(action.payload.music);
      if (action.payload.ifSwitchPlay) {
        state.currentIndex = state.playList.length - 1;
      }
    },
    // 由于歌单接口不能直接获取歌曲url,需要额外更新歌曲url
    updateCurrentMusicWithUrlAction(
      state,
      action: PayloadAction<MusicDetailModel>
    ) {
      let currentMusic = getCurrentMusic(state);
      console.log(action.payload);
      if (currentMusic) {
        currentMusic.url = action.payload.url;
      }
    },
    addLyricAction(
      state,
      action: PayloadAction<{ musicId: number; lyric: string }>
    ) {
      const { musicId, lyric } = action.payload;
      const targetMusic = state.playList.find((item) => item.id === musicId);
      if (targetMusic) {
        targetMusic.lyric = lyric;
      }
    },
  },
});

const fetchLyricIfNotExist = (currentMusic: MusicDetailModel) => {
  if (!currentMusic?.lyric) {
    console.log("fetchLyricIfNotExist");
    // 获取歌词
    request({
      url: "/lyric",
      params: {
        id: currentMusic.id,
      },
    }).then((res: LyricResModel) => {
      currentMusic.lyric = res.lrc.lyric;
    });
  }
};

// selectors
const getCurrentMusic = (playMusic: PlayListState) => {
  const currentMusic = playMusic.playList[playMusic.currentIndex] || null;
  if (currentMusic) {
    fetchLyricIfNotExist(currentMusic);
  }
  return currentMusic;
};

export const selectPlayMusic = (state: { playMusic: PlayListState }) =>
  state.playMusic;

export const selectCurrentMusic = createSelector(
  [selectPlayMusic],
  getCurrentMusic
);

export const selectPlayList = (state: PlayListState) => state;

export const {
  switchMusicAction,
  appendMusicAction,
  updatePlayListAction,
  updateCurrentMusicWithUrlAction,
} = playMusicSlice.actions;

export default playMusicSlice.reducer;
