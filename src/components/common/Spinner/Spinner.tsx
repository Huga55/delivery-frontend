import React from "react";
import c from "./Spinner.module.css";

type PropsType = {
    whiteBg: boolean
}

const Spinner: React.FC<PropsType> = (props) => {
    const { whiteBg } = props;

    return(
        <div className={whiteBg? `${c.spinner} ${c.spinner_white}` : c.spinner}>
            <span className={c.spinner__elem}>

            </span>
        </div>
    );
}

export default Spinner;