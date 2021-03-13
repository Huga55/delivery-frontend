import React from "react";

type PropsType = {
    children: string
    type: string
    className: string
    disabled?: boolean
    onClick?: () => void
}

const Button: React.FC<PropsType> = (props) => {
    const { children, type, className, ...otherProps } = props;

    return(
        <button className={`${className} btn btn_${type}`} {...otherProps} >
            {children}
        </button>
    );
}

export default Button;