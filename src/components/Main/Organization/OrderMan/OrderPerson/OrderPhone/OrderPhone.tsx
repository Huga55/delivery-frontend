import c from "./OrderPhone.module.css";
import Label from "../../../../../common/Label/Lable";
import Input from "../../../../../common/Input/Input";
import {useState} from "react";
import {useFormContext} from "react-hook-form";
import {getValidateProps} from "../../../../../utils/validate/validate";

type PropsType = {
    type: "dispatch" | "delivery"
    indexName: number
    firstPhoneValue?: string
    setFirstPhoneValue?: (phone: string) => void
}

const OrderPhone: React.FC<PropsType> = (props) => {
    const [phoneCount, setPhoneCount] = useState(1);

    const { type, indexName, firstPhoneValue, setFirstPhoneValue } = props;

    const { register, errors } = useFormContext();

    const phones = [];

    for(let i = 0; i < phoneCount; i++) {
        if(i === 0) {
            phones.push(
                <Label className={`label_phone label-phone_${type}`} key={i}>
                    <Input className={`organization__input organization__input_${type}-phone`}
                           name={`${indexName}-phone-${type}-${i}`} type="phone" placeholder="+7 ___ ___-__-__" error={true}
                            value={firstPhoneValue} setInputValue={setFirstPhoneValue}
                            register={register} errorData={errors}
                            validateProps={getValidateProps({standart: ["required"], custom: ["phone"]})}/>
                </Label>
            );
        }else {
            phones.push(
                <Label className={`label_phone label-phone_${type}`} key={i}>
                    <Input className={`organization__input organization__input_${type}-phone`}
                           name={`${indexName}-phone-${type}-${i}`} type="phone" placeholder="+7 ___ ___-__-__" error={true}
                           register={register} errorData={errors}
                           validateProps={getValidateProps({standart: ["required"], custom: ["phone"]})}/>
                    {phoneCount === (i + 1)? <span className="man__last" onClick={() => setPhoneCount(phoneCount - 1)}>&#10006;</span> : ""}
                </Label>
            );
        }
    }

    return(
        <div className={c.man__phone}>
            <label htmlFor="" className="organization__label">
                Телефон:
            </label>
            <div className={c["man__row-phone"]}>
                <div className={c.man__phones}>
                    {phones}
                </div>
                <div className="add-phone" onClick={() => setPhoneCount(phoneCount + 1)}>Добавить телефон</div>
            </div>
        </div>
    );
}

export default OrderPhone;