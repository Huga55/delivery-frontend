import c from "./OrderPersonName.module.css";
import Label from "../../../../../common/Label/Lable";
import Input from "../../../../../common/Input/Input";
import OrderPhone from "../OrderPhone/OrderPhone";
import {useForm, useFormContext} from "react-hook-form";
import {getValidateProps} from "../../../../../utils/validate/validate";
import {Dispatch, SetStateAction} from "react";

type PropsType = {
    type: "dispatch" | "delivery"
    index: number
    count?: number
    setCount?: Dispatch<SetStateAction<number>>
}

const OrderPersonName: React.FC<PropsType> = (props) => {
    const { type, index, count, setCount } = props;

    const { register, errors } = useFormContext();

    const isDispatch = type === "dispatch";

    return(
        <div className={`${isDispatch? "" : "organization__row_man-delivery"} organization__row organization__row_man`}>
            <div className={c.man__name}>
                <label htmlFor="" className="organization__label">
                    {isDispatch? "Отправитель:" : "Получатель:"}
                </label>
                <Label className={"label_name label-man_" + type}>
                    <Input className={`organization__input organization__input_${type}-name`}
                           name={`name-${type}-${index}`}
                           type="" placeholder="ФИО" error={false}
                            register={register}
                            errorData={errors}
                            validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                    {count && count === (index + 1)? <span className="man__last" onClick={() => setCount(count - 1)}>&#10006;</span> : ""}
                </Label>
            </div>
            <OrderPhone type={type} indexName={index} />
        </div>
    );
}

export default OrderPersonName;