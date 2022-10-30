import { UserInfoModel } from "@/model/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const USER_INFO_STORAGE_KEY = "userInfo"

const initialState: () => UserInfoModel | null = () => {
    const jsonStr = localStorage.getItem(USER_INFO_STORAGE_KEY);
    if (jsonStr) {
        const userInfo = JSON.parse(jsonStr) as UserInfoModel
        return userInfo
    }
    return null
}

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: initialState,
    reducers: {
        updateUserInfoAction: (state, action: PayloadAction<UserInfoModel>) => {
            const userInfo = action.payload;
            state = userInfo;
            localStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(userInfo))
        },
    }
})

export const selectUserInfo = (state: {
    userInfo: UserInfoModel
}) => state.userInfo;

export const {
    updateUserInfoAction,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;