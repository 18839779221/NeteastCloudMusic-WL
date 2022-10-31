import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../userInfoSlice';
import './UserInfoMoreModal.css'

interface Props{
    visible: boolean;
    close: () => void;
}

export const UserInfoMoreModal: React.FC<Props> = (props) => {

    const dispatch = useDispatch()

    const handleMoreClick = (clickType: string | undefined) => {
        switch(clickType) {
            case "quit": {
                logout()
                break;
            }
            default: {
                
            }
        }
    }

    const logout = () => {
        dispatch(logoutAction())
    }

    return props.visible ? (
        <div className="user-more-container">
            {moreList.map((item, index) => (
                <Fragment key={item.name}>
                <div 
                className='user-more-item'
                  onClick={() => handleMoreClick(item.clickType)}>
                    {item.name}
                </div>
                {item.showBottomDivider && (
                    <div className='user-more-item-bottom-line'></div>
                )}
                </Fragment>
            ))}
        </div>
    ) : null;
}

const moreList = [
    {
        name: "我的主页",
        icon: "",
    },
    {
        name: "我的消息",
        icon: "",
    },
    {
        name: "我的等级",
        icon: "",
    },
    {
        name: "VIP会员",
        icon: "",
        showBottomDivider: true
    },
    {
        name: "个人设置",
        icon: "",
    },
    {
        name: "实名认证",
        icon: "",
        showBottomDivider: true
    },
    {
        name: "退出",
        icon: "",
        clickType: "quit",
    }
]