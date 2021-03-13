import c from "./OrderTime.module.css";
import Label from "../../../common/Label/Lable";
import Input from "../../../common/Input/Input";
import {Controller, useFormContext} from "react-hook-form";
import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getValidateProps} from "../../../utils/validate/validate";
import MaskedInput from "react-input-mask";


const OrderTime: React.FC = () => {
    const [dispatchDate, setDispatchDate] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const { register, errors, setValue, control } = useFormContext();

    useEffect(() => {
        setValue("date-dispatch", getDateFormat(dispatchDate));
    }, [dispatchDate])

    useEffect(() => {
        setValue("date-delivery", getDateFormat(deliveryDate));
    }, [deliveryDate])

    useEffect(() => {
        setValue("date-dispatch", "");
        setValue("date-delivery", "");
    }, [])

    const getDateFormat = (dateOld) => {
        const date = new Date(dateOld);
        const day = ("" + date.getDate()).length === 1? "0" + date.getDate() : date.getDate();
        const month = ("" + (date.getMonth() + 1) ).length === 1? "0" + (1 + date.getMonth()) : (1 + date.getMonth());
        const year = date.getFullYear();

        return day + "." + month + "." + year;
    }

    return(
        <div className={c.time + " organization__block"}>
            <div className={c.time__left + " organization__left"}>
                <img src="/static/img/organization/time.svg" alt="" className="organization__img" />
            </div>
            <div className={c.time__right + " organization__right"}>
                <div className="organization__subtitle title-4">
                    Расчетное время
                </div>
                <div className={c.time__row + " organization__row"}>
                    <div className={c["time__block-left"]}>
                        <label htmlFor="" className="organization__label">
                            Дата забора груза
                        </label>
                        <Label className={c.time__label + " label_dispatch-date"}>
                            <Input className={c.time__input + " organization__input organization__input_dispatch"}
                                   name="date-dispatch" type="date" placeholder="Выберите дату" error={true} register={register}
                                   errorData={errors} validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                            <DatePicker
                                selected={dispatchDate}
                                onChange={date => setDispatchDate(date)}
                                className="datepicker"
                            />
                        </Label>
                        <div className={c.time__block}>
                            <Label>
                            <Controller
                                as={MaskedInput}
                                className={`${c.time__input_time} input ${errors && errors["time_from_dispatch"]? "input_error" : ""}`}
                                control={control}
                                mask="99:99"
                                placeholder="__:__"
                                name="time_from_dispatch"
                                rules={getValidateProps({standart: ["required"], custom: ["time"]})}
                            />
                                <span className={c.time__prompt}>От</span>
                                {errors && errors["time_from_dispatch"]? <span className="label__error label__error-textarea">{errors["time_from_dispatch"].message}</span> : ""}
                            </Label>
                            <Label>
                            <Controller
                                as={MaskedInput}
                                className={`${c.time__input_time} input ${errors && errors["time_to_dispatch"]? "input_error" : ""}`}
                                control={control}
                                mask="99:99"
                                placeholder="__:__"
                                name="time_to_dispatch"
                                rules={getValidateProps({standart: ["required"], custom: ["time"]})}
                            />
                                <span className={c.time__prompt}>До</span>
                                {errors && errors["time_to_dispatch"]? <span className="label__error label__error-textarea">{errors["time_to_dispatch"].message}</span> : ""}
                            </Label>
                        </div>
                    </div>
                    <div className={c["time__block-right"]}>
                        <label className="organization__label">
                            Дата доставки
                        </label>
                        <Label className={c.time__label + " label_delivery-date"}>
                            <Input className={c.time__input + " organization__input organization__input_delivery"}
                                   name="date-delivery" type="date" placeholder="Выберите дату" error={true} register={register}
                                   errorData={errors} validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                            <DatePicker
                                selected={deliveryDate}
                                onChange={date => setDeliveryDate(date)}
                                className="datepicker"
                            />
                        </Label>
                        <div className={c.time__block}>
                            <Label>
                        <Controller
                            as={MaskedInput}
                            className={`${c.time__input_time} input ${errors && errors["time_from_delivery"]? "input_error" : ""}`}
                            control={control}
                            mask="99:99"
                            name="time_from_delivery"
                            placeholder="__:__"
                            rules={getValidateProps({standart: ["required"], custom: ["time"]})}
                        />
                            <span className={c.time__prompt}>От</span>
                                {errors && errors["time_from_delivery"]? <span className="label__error label__error-textarea">{errors["time_from_delivery"].message}</span> : ""}
                            </Label>
                            <Label>
                            <Controller
                                as={MaskedInput}
                                className={`${c.time__input_time} input ${errors && errors["time_to_delivery"]? "input_error" : ""}`}
                                control={control}
                                mask="99:99"
                                name="time_to_delivery"
                                placeholder="__:__"
                                rules={getValidateProps({standart: ["required"], custom: ["time"]})}
                            />
                                <span className={c.time__prompt}>До</span>
                                {errors && errors["time_to_delivery"]? <span className="label__error label__error-textarea">{errors["time_to_delivery"].message}</span> : ""}
                            </Label>
                        </div>
                    </div>
                </div>
                <div className={c.time__window}>
                    <div className={c["time__window-title"] + " text"}>
                        Не получается приехать сегодня. Перенести доставку на завтра?
                    </div>
                    <div className={c.time__buttons}>
                        <button className={c.time__button + " btn btn_green"}>
                            Продолжить
                        </button>
                        <button className={`${c.time__button} ${c.time__button_blue} btn btn_blue`}>
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderTime;