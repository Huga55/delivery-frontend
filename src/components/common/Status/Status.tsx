

type PropsType = {
    type: string
}

const Status = (props) => {
    return(
        <div className="actual__info-status info-status text">
            Ожидает подтверждения
        </div>
    );
}

export default Status;