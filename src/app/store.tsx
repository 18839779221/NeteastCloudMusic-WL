import { combineReducers, configureStore } from "@reduxjs/toolkit";
import playMusicReducer from "../music_player/playMusicSlice";

export default configureStore({
    reducer: combineReducers({
        playMusic: playMusicReducer,
    })
}) 