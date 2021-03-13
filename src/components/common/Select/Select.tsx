import {Dispatch, SetStateAction, useEffect, useState} from "react";


type PropsType = {
    classNameGeneral?: string
    classNameTitle?: string
    classNameOption?: string
    title?: string
    optionsText: string[]
    variables?: string[]
    setOption?: Dispatch<SetStateAction<string>>
    indexOptionActive?:number

    dropValue?: boolean
    setDropValue?: Dispatch<SetStateAction<boolean>>//for clean use state of dropvalue
}

const Select: React.FC<PropsType> = (props) => {
    const [isActive, setIsActive] = useState(false);
    const [selectTitle, setSelectTitle] = useState(null);

    const { classNameGeneral,  classNameTitle, classNameOption, title, optionsText, variables, setOption, indexOptionActive, dropValue, setDropValue } = props;

    const changeSelect = (text, index) => {
        setSelectTitle(text);
        if(variables) {
            setOption(variables[index]);
        }
    };

    useEffect(() => {
        //if want to change of organization and address
        if(indexOptionActive) {
            setOption(variables[indexOptionActive]);
        }
    }, []);

    useEffect(() => {
        //if want to drop filters, then need to drop value of select
        if(dropValue) {
            if(title) {
                setSelectTitle(title);
            }else {
                setSelectTitle(optionsText[0]);
            }
            setDropValue(false);//clean use state
        }
    }, [dropValue])

    return(
        <div className={isActive? classNameGeneral + " lk__select lk-select_active" : classNameGeneral + " lk__select"} onClick={() => setIsActive(!isActive)}>
            <div className={classNameTitle + " lk__select-top"}>
                {selectTitle? selectTitle : title? title : optionsText[indexOptionActive]}
            </div>
            <div className={isActive? "lk__select-bottom lk__select-bottom_active" : "lk__select-bottom"}>
                {optionsText.map((text, index) =>
                    <div className={classNameOption + " lk__option"} key={index} onClick={() => changeSelect(text, index)}>{text}</div>)}
            </div>
        </div>
    );
}

export default Select;