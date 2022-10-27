import './PhoneLoginModal.css'

interface Props {
    visible: boolean;
    close: () => void;
}

export const PhoneLoginModal: React.FC<Props> = (props) => {
    return (
        <div className='phone-login-modal-mask'>
            <div className='phone-login-container'>
                <div className='phone-login-header'>
                    <div className='phone-login-header-title'>手机号登录</div>
                    <a className='phone-login-header-close' onClick={() => props.close()}>X</a>
                </div>
                <div className='phone-login-content'>
                    <div className='phone-login-phone'>
                        <div className='phone-login-phone-area'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}