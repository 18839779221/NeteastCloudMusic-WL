import './PhoneLoginModal.css'
import { useState } from 'react';
import request from '@/utils/request';
import { LoginResModel } from '@/model/model';
import { useDispatch } from 'react-redux';
import { updateUserInfoAction } from '../userInfoSlice';

interface Props {
    visible: boolean;
    close: () => void;
}

export const PhoneLoginModal: React.FC<Props> = (props) => {

    const [autoLogin, setAutoLogin] = useState(false)
    const [errorTips, setErrorTips] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const validateAndLogin = () => {
        const phoneRegExp = /^[1][3,4,5,6.7,8,9][0-9]{9}$/
        const passwordRegExp = /^\w{5,17}$/
        const isLegalPhone = phoneRegExp.test(phone)
        const isLegalPassword = passwordRegExp.test(password)
        if (!isLegalPhone) {
            setErrorTips("手机号输入有误，请检查")
        } else if (!isLegalPassword) {
            setErrorTips("密码输入有误，请检查")
        } else {
            setErrorTips("")
            login()
        }
    }

    const login = () => {
        request({
            url: "/login/cellphone",
            method: "POST",
            data: {
                phone: phone,
                password: encodeURIComponent(password),
            }
        }).then((res: LoginResModel) => {
            console.log(res);
            if (res.code === 200) {
                if (res.profile) {
                    dispatch(updateUserInfoAction(res.profile));
                }
                props.close()
            }
            
        })
    }

    const onPhoneEdit = (e: any) => {
        const inputValue = e.target.value
        if (typeof inputValue === 'string') {
            setPhone(inputValue)
        }
    }

    const onPasswordEdit = (e: any) => {
        const inputValue = e.target.value
        if (typeof inputValue === 'string') {
            setPassword(inputValue)
        }
    }

    const handleAutoLoginChange = (e: any) => {
        const checked = e.target.checked

        if (typeof checked === "boolean") {
            setAutoLogin(checked)
        }
    }

    return (
        <div className='phone-login-modal-mask'>
            <div className='phone-login-container'>
                <div className='phone-login-header'>
                    <div className='phone-login-header-title'>手机号登录</div>
                    <a className='phone-login-header-close' onClick={() => props.close()}>X</a>
                </div>
                <div className='phone-login-content'>
                    <div className='phone-login-phone'>
                        <div className='phone-login-phone-area'>+86</div>
                        <input
                            type="text"
                            placeholder='请输入手机号'
                            value={phone}
                            onChange={onPhoneEdit}></input>
                    </div>
                    <div className='phone-login-password'>
                        <input
                            type="password"
                            placeholder='请输入密码'
                            value={password}
                            onChange={onPasswordEdit}></input>
                        <a className='phone-login-password-forget'>{"忘记密码?"}</a>
                    </div>
                    {errorTips.length > 0 && (
                        <div className='phone-login-error-tips'>{errorTips}</div>)}
                    <label className='phone-login-auto-login'>
                        <input
                            type="checkbox"
                            onChange={handleAutoLoginChange}
                            checked={autoLogin} />
                        自动登录
                    </label>
                    <a className='phone-login-btn-login' onClick={() => validateAndLogin()}>登录</a>
                </div>
            </div>
        </div>
    );
}