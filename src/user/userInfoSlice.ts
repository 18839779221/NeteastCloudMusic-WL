import { UserInfoModel } from "@/model/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const USER_INFO_STORAGE_KEY = "userInfo"

interface UserInfoState {
    userInfo: UserInfoModel | null;
}

const initialState: () => UserInfoState = () => {
    const jsonStr = localStorage.getItem(USER_INFO_STORAGE_KEY);
    const userInfoState = {
        userInfo: null,
    } as UserInfoState
    if (jsonStr) {
        const userInfo = JSON.parse(jsonStr) as UserInfoModel
        userInfoState.userInfo = userInfo
    }
    return userInfoState
}

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: initialState,
    reducers: {
        // 切换用户，更新用户信息
        updateUserInfoAction: (state, action: PayloadAction<UserInfoModel>) => {
            const userInfo = action.payload;
            state.userInfo = userInfo;
            localStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(userInfo))
        },
        // 登出
        logoutAction: (state) => {
            state.userInfo = null
            localStorage.setItem(USER_INFO_STORAGE_KEY, "")
        },
        testAction: (state) => {
            console.log(state.userInfo)
        }
    }
})

export const selectUserInfo = (state: {
    userInfo: UserInfoState
}) => state.userInfo.userInfo;

export const {
    updateUserInfoAction,
    logoutAction,
    testAction,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;