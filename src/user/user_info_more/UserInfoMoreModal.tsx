import './UserInfoMoreModal.css'

interface Props{
    visible: boolean;
    close: () => void;
}

export const UserInfoMoreModal: React.FC<Props> = (props) => {

    return props.visible ? (
        <div className="user-more-container">

        </div>
    ) : null;
}