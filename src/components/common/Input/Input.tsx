import React, {useEffect, useState} from "react";
import { ValidateCustomType } from "../../utils/validate/validate";
import { useDispatch, useSelector } from "react-redux";
import {clearAll} from "../../../../redux/reducers/errors-reducer";
import {
    clearAdressesAction,
    getCorrectAddress,
    getPrice,
    setAddressFromMapAction
} from "../../../../redux/reducers/form-reducer";
import {Controller, useFormContext} from "react-hook-form";
import MaskedInput from "react-input-mask";
import {getName} from "../../../../redux/reducers/profile-reducer";

type RefReturn =
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;

export type RegisterType = (validateProps) => RefReturn

type PropsType = {
    className: string
    name: string
    type: string
    placeholder: string
    error: boolean
    validateProps?: ValidateCustomType
    register?: RegisterType
    errorData?:any /*{
        name: {
            type: string,
            types: Array<{ validateName: string | boolean }>,
            message: string,
            ref: any,
        }

    }*/
    value?: string
    defaultValue?: string
    setInputValue?: (value: string) => void //use state, to use old value, for example old address or old name and phone
    inputValue?: string

    disabled?: boolean
    setError?: any //react hook form
    customError?: {type: string, message: string}


    autoComplete?: "off"//prompt standart of browser off
}

const Input: React.FC<PropsType> = (props) => {
    const [thisValue, setThisValue] = useState("");
    const [lastCorrectAddress, setLastCorrectAddress] = useState("");
    const [isInterval, setIsInterval] = useState(false);
    const [intervalId, setIntervalId] = useState();

    //because address have his intervals for change address and second to get price
    const [isIntervalOrder, setIsIntervalOrder] = useState(false);
    const [intervalIdOrder, setIntervalIdOrder] = useState();

    if(useFormContext()) {
        var { setValue, getValues, control } = useFormContext();
    }

    const { className, type, error, register, errorData, validateProps, setInputValue, setError, customError, inputValue, value, defaultValue, ...otherProps } = props;

    const dispatch = useDispatch();
    const { address, nameInputActive, addressFromMap } = useSelector(state => state.form);//data from dadata (correct address)

    useEffect( () => {
        if(type === "address") {
            setLastCorrectAddress(getValues(otherProps.name));
        }
        if(value) {
            setThisValue(value);
        }
    }, [])

    useEffect(() => {
        if(inputValue !== "") {
            setThisValue(inputValue);
        }
    }, [inputValue])

    useEffect(() => {
        if(addressFromMap && otherProps.name === "address-" + addressFromMap.direction) {
            //set new address of current place of yandex map
            setValue("address-" + addressFromMap.direction, addressFromMap.address);
            setLastCorrectAddress(addressFromMap.address);
            dispatch(setAddressFromMapAction(null));
            //update of price
            changeInputOFOrderForm();
        }
    }, [addressFromMap])

    const changeValue = (e) => {
        if(otherProps.name === "val" && +e.currentTarget.value > 50000) {
            setValue("val", "50000");
        }
        if(otherProps.name === "address-dispatch" || otherProps.name === "address-delivery" ||
            otherProps.name === "weight" || otherProps.name === "val") {
            changeInputOFOrderForm();
        }
        if(type === "inn" && e.currentTarget.value.length === 10) {
            getNameFromInn(e.currentTarget.value);
        }
        if(type === "address") {
            let value = e.currentTarget.value;

            if(type === "address") {
                addressControl(value);
            }
            //если функции не  существует, value не зависит от хуков(use state)
            e.currentTarget.value = value;
            setThisValue(value);
        }
        if(setError) {
            dispatch(clearAll());//clear errors from server after ajax
        }
    }

    useEffect(() => {
        if(type === "address") {
            setValue(otherProps.name, lastCorrectAddress);
        }
    }, [lastCorrectAddress])

    const changeAddress = (correctAddress) => {
        if(setValue) {
            setLastCorrectAddress(correctAddress);
        }else {
            setThisValue(correctAddress);
        }
    }

    const addressControl = (value) => {
        if(intervalId) {
            clearInterval(intervalId);
        }
        // @ts-ignore
        setIntervalId(setTimeout(getAddresses, 500, value));
        if(isInterval) {
            return;
        }
        setIsInterval(true);
    }

    const getAddresses = (value) => {
        setIsInterval(false);
        dispatch(getCorrectAddress(value, otherProps.name));
    }

    const clearPromptOfAddress = () => {
        if(type === "address") {
            setValue(otherProps.name, lastCorrectAddress);
            dispatch(clearAdressesAction());
        }
    }

    const getNameFromInn = (value) => {
        dispatch(getName(value));
    }

    const changeInputOFOrderForm = () => {
        clearInterval(intervalIdOrder);
        // @ts-ignore
        setIntervalIdOrder(setTimeout(getPriceOfServer, 500));
        if(!isIntervalOrder) {
            setIsIntervalOrder(true);
        }
    }

    const getPriceOfServer = () => {
        setIsIntervalOrder(false);
        const data = getValues(["address-dispatch", "address-delivery", "weight", "val"]);
        const dataSend = {
            address_delivery: data["address-delivery"],
            address_dispatch: data["address-dispatch"],
            val: data.val? data.val : 0,
            weight: data.weight,
        }
        dispatch(getPrice(dataSend));
    }

    if(type === "textarea") {
        return(
            <>
                <textarea type={otherProps.name === "password" ? "password" : "text"}
                       className={`${className} input ${errorData && errorData[otherProps.name] || setError? "input_error" : ""}`}
                       {...otherProps}
                    /*for react-hook-form*/
                    // @ts-ignore
                       ref={register && validateProps && !otherProps.disabled? register(validateProps) : register({})}
                    /* for address, name, phone */
                       onChange={(e) => changeValue(e)}
                />
                {errorData && errorData[otherProps.name]? <span className="label__error label__error-textarea">{errorData[otherProps.name].message}</span> : ""}
            </>
        );
    }

    if(register) {
        return(
            <>
                {type === "phone"?
                    /*<MaskedInput
                        mask="+7 999 999-99-99"
                        onChange={(e) => setThisValue(e.target.value)}
                        value={thisValue? thisValue : getValues(otherProps.name)}
                        name={otherProps.name}
                    >
                        {(inputProps) => (
                        <input type="text"
                               className={`${className} input ${errorData && errorData[otherProps.name] || setError? "input_error" : ""}`}
                                name={inputProps.name}
                               placeholder={otherProps.placeholder}*/
                            /*for react-hook-form*/
                               //ref={validateProps && !otherProps.disabled? register(validateProps) : register({})}
                            /* for address, name, phone */
                               //defaultValue={inputProps.value}
                       /* />
                        )}
                    </MaskedInput>*/
                        <Controller
                            as={MaskedInput}
                            className={`${className} input ${errorData && errorData[otherProps.name] || setError? "input_error" : ""}`}
                            control={control}
                            placeholder={otherProps.placeholder}
                            mask="+7 999 999-99-99"
                            name={otherProps.name}
                            defaultValue={thisValue}
                            {...otherProps}
                            rules={validateProps}
                        />
                    :
                    <input type={otherProps.name === "password" || type === "password" ? "password" : "text"}
                           className={`${className} input ${errorData && errorData[otherProps.name] || setError? "input_error" : ""}`}
                           {...otherProps}
                        /*for react-hook-form*/
                           ref={(validateProps && !otherProps.disabled) || type === "inn"? register(validateProps) : register({})}
                        /* for address, name, phone */
                           onChange={type !== "phone"? (e) => changeValue(e) : () => ""}
                           onInput={type === "phone"? (e) => changeValue(e) : () => ""}
                           onBlur={() => clearPromptOfAddress()}
                           defaultValue={thisValue}
                           readOnly={type === "date"}
                    />
                }

                {errorData && errorData[otherProps.name]? <span className="label__error">{errorData[otherProps.name].message}</span> : ""}
                {errorData && !errorData[otherProps.name] && setError? <span className="label__error">{customError.message}</span> : ""}
                {otherProps.name === nameInputActive ?
                    <div className="addresses-prompt">
                        {address.map((a, index) => {
                            return (
                                <span key={index} className="address-prompt" onMouseDown={() => changeAddress(a)}>{a}</span>
                            );
                        })
                        }
                    </div> : ""}
            </>
        );

    }else {
        if(type === "address") {
            return (
                <>
                    <input type="text"
                           className={`${className} input ${errorData && errorData[otherProps.name] || setError ? "input_error" : ""}`}
                           {...otherProps}
                        /* for address, name, phone */
                           onChange={(e) => changeValue(e)}
                           onBlur={() => clearPromptOfAddress()}
                           value={thisValue}
                    />
                    {otherProps.name === nameInputActive ?
                        <div className="addresses-prompt">
                            {address.map((a) => {
                                return (
                                    <span className="address-prompt" onMouseDown={() => changeAddress(a)}>{a}</span>
                                );
                            })
                            }
                        </div> : ""}
                </>
            );
        }else {
            return (
                <>
                    <input type={otherProps.name === "password" ? "password" : "text"}
                           className={`${className} input`} {...otherProps}/>
                </>
            );
        }

    }
}

export default Input;