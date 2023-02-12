import React, { useState } from "react";

export const LoginModalContext = React.createContext<LoginModalContextInterface>({
    visible: false,
    setVisible: (visible: boolean) => { },
});

export interface LoginModalContextInterface {
    visible: boolean,
    setVisible: (visible: boolean) => void,
}

export const useLoginModalContext = () => {
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const defaultUserState = {
        visible: loginModalVisible,
        setVisible: (visible: boolean) => { setLoginModalVisible(visible) }
    } as LoginModalContextInterface

    return defaultUserState;
}