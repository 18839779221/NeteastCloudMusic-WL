import { combineReducers, configureStore } from "@reduxjs/toolkit";
import playMusicReducer from "@/music_player/playMusicSlice";
import userInfoReducer from "@/user/userInfoSlice";

export default configureStore({
    reducer: combineReducers({
        playMusic: playMusicReducer,
        userInfo: userInfoReducer
    })
}) 