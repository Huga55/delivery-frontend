import React, {useEffect, useState} from "react";
import {RegisterType} from "../Input/Input";

type PropsType = {
    className: string
    name: string
    inputs: Array<{
        beforeId: string
        afterId: string
        value:string
        html: string
        classNameInput?:string
        classNameLabel?: string
        register?: RegisterType
    }>
    setTypeCargo?: (type: string) => void
    disabled?: boolean
    indexValueDefault?: number
}

const Radios: React.FC<PropsType> = (props) => {
    const [radioActive, setRadioActive] = useState(0);

    const { className, inputs, name, setTypeCargo, disabled, indexValueDefault } = props;

    const changeValue = (index, value) => {
        setRadioActive(index);
        if(setTypeCargo) {
            setTypeCargo(value);
        }
    }

    useEffect(() => {
        if((!isNaN(indexValueDefault))) {
            setRadioActive(indexValueDefault);
        }
    }, [])

    return(
        <div className={`${className} radios`}>
            {inputs.map( (i, index) => {
                return(
                    <React.Fragment key={index}>
                        {!disabled?
                            <input type="radio" id={`${i.beforeId}-radio-${i.afterId}`}
                                   className={`${i.classNameInput} radio`}
                                   name={name}
                                   value={i.value}
                                   ref={i.register}
                                    defaultChecked={index === radioActive}/> : ""
                        }

                        <label htmlFor={`${i.beforeId}-radio-${i.afterId}`} className={`${i.classNameLabel} label label_radio`} onClick={() => changeValue(index, i.value)}>
                            {i.html}
                        </label>
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default Radios;