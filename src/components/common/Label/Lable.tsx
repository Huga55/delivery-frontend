import React from "react";

type PropsType = {
    className?: string
}

const Label: React.FC<PropsType> = (props) => {
    const { className, children } = props;

    return(
        <label className={className? `label label_input ${className}` : "label label_input"}>
            {children}
        </label>
    );
}

export default Label;