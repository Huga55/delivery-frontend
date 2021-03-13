import c from "./OrderVal.module.css";
import Input from "../../../common/Input/Input";
import {getValidateProps} from "../../../utils/validate/validate";
import Label from "../../../common/Label/Lable";
import {useFormContext} from "react-hook-form";


const OrderVal = () => {
    const { register, errors } = useFormContext();

    return(
        <div className={c.val + " organization__block"}>
            <div className={c.val__left + " organization__left"}>
                <img src="/static/img/organization/val.svg" alt="" className="organization__img" />
            </div>
            <div className={c.val__right + " organization__right"}>
                <div className="organization__subtitle title-4">
                    Ценность посылки
                </div>
                <Label className={c.val__label}>
                    <Input className={c.val__input + " organization__input"}
                           name="val" type="" placeholder="Ценность посылки" error={true}
                           register={register} errorData={errors}
                           validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                    <span className={c.val__prompt}>плюс 0 ₽ к заказу</span>
                </Label>
                <span className={c.val__text}>
                    Компенсируем ценность утерянных отправлений и выручки<br className={c.val__br}/>
                    в течении трех рабочих дней по <a href="#" className={c.val__link + " link link_green"}>регламенту</a>.<br className={c.val__br}/>
                    Максимальная компенсация - 50 000₽.
                </span>
            </div>
        </div>
    );
}

export default OrderVal;