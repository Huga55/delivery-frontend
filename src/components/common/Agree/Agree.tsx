import React, {useEffect, useState} from "react";

type PropsType = {
    className: string
    prefixId: string
    setIsAgree: (status) => void
    value?: boolean
}

const Agree: React.FC<PropsType> = (props) => {
    const { className, prefixId, children, setIsAgree, value } = props;

    const [status, setStatus] = useState(value? value : true);

    const changeAgree = () => {
        setStatus(!status);
        setIsAgree(!status);
    }

    useEffect(() => {
        if(value === false || value === true) {
            setStatus(value);
        }
    }, [value])

    return(
        <>
            <input type="checkbox" className="checkbox" name="agree" id={prefixId + "-agree"} defaultChecked={status}/>
            <label htmlFor={prefixId + "-agree"}
                   className={`${className} label label-checkbox`}
                    onClick={changeAgree}>
                {children}
            </label>
        </>
    );
}

export default Agree;