import c from "./OrderType.module.css";
import Radios from "../../../common/Radios/Radios";
import Label from "../../../common/Label/Lable";
import Input from "../../../common/Input/Input";
import {useState} from "react";
import {useFormContext} from "react-hook-form";
import {getValidateProps} from "../../../utils/validate/validate";

const OrderType: React.FC = () => {
    const [oversized, setOversized] = useState(false);
    const [oneSize, setOneSize] = useState(false);
    const [typeCargo, setTypeCargo] = useState("docs");
    const [oneWeight, setOneWeight] = useState(false);

    const { register, errors } = useFormContext();

    const inputsOfSize: Array<{text: string, name: string, unit: string}> = [
        {text: "Длина:", name: "type-length", unit: "м"},
        {text: "Ширина:", name: "type-width", unit: "м"},
        {text: "Высота:", name: "type-height", unit: "м"},
        {text: "Объем:", name: "type-size", unit: "м3"},
    ];

    return(
        <div className={c.type + " organization__block"}>
            <div className={c.type__left + " organization__left"}>
                <img src="/static/img/organization/type.svg" alt="" className="organization__img" />
            </div>
            <div className={c.type__right + " organization__right"}>
                <div className={c.type__cargo}>
                    <div className="organization__subtitle title-4">
                        Что везем
                    </div>
                    <label htmlFor="" className="organization__label">
                        Тип вложения:
                    </label>
                    <Radios className={c.type__radios} name="cargo-type" setTypeCargo={setTypeCargo} inputs={[
                        {beforeId: "type", afterId: "doc", classNameLabel: c["type__label-cargo"], value: "docs", html: "Документы", register },
                        {beforeId: "type", afterId: "cargo", classNameLabel: c["type__label-cargo"], value: "cargo", html: "Груз", register },
                    ]} />
                    {
                        typeCargo === "cargo"?
                            <>
                                <label className="organization__label">
                                    Что везем?
                                </label>
                                <Label className="label_type">
                                    <Input className="organization__input organization__input_cargo"
                                           name="name_cargo" type="" placeholder="Подарок, торт, цветы, регистратор" error={false}
                                           register={register} errorData={oneWeight? errors : ""}
                                           validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                                </Label>
                                <div className="organization__row organization__row_size">
                                    <div className={c.type__left}>
                                        <label htmlFor="" className="organization__label">
                                            Вес:
                                        </label>
                                        <Radios className={c.type__radios} name="weight" disabled={oneWeight} inputs={[
                                            {beforeId: "type", afterId: "1kg", classNameLabel: c["type__radio-size"], value: "1", html: "до 1 кг", register},
                                            {beforeId: "type", afterId: "5kg", classNameLabel: c["type__radio-size"], value: "5", html: "до 5 кг", register },
                                            {beforeId: "type", afterId: "10kg", classNameLabel: c["type__radio-size"], value: "10", html: "до 10 кг", register },
                                            {beforeId: "type", afterId: "15kg", classNameLabel: c["type__radio-size"], value: "15", html: "до 15 кг", register },
                                        ]} />
                                    </div>
                                    <div className={c.type__right}>
                                        <label className="organization__label">
                                            Точный вес:
                                        </label>
                                        <Label className="label_type">
                                            <Input className="organization__input organization__input_type"
                                                   name={!oneWeight? "weight-none" : "weight"} type="" placeholder="0" error={false}
                                                   register={register} errorData={oneWeight? errors : ""} disabled={!oneWeight}
                                                    validateProps={getValidateProps({standart: ["required"], custom: ["isNumber"]})}/>
                                            <span className="type__text">кг</span>
                                        </Label>
                                        <input type="checkbox" className="checkbox" id="type-weight" defaultChecked={false}/>
                                        <label htmlFor="type-weight"
                                               className={c["type__label-checkbox"] + " label-checkbox"}
                                               onClick={() => setOneWeight(!oneWeight)}>указать вес</label>
                                    </div>
                                </div>
                                <div className={c.type__size}>
                                    {inputsOfSize.map((e) => {
                                        return (
                                            <div className={c["type__size-box"]}>
                                                <label className="organization__label">
                                                    {e.text}
                                                </label>
                                                <Label className="label_type label_size">
                                                    <Input
                                                        className="organization__input organization__input_type"
                                                        name={(oneSize && e.name !== "type-size") || (!oneSize && e.name === "type-size") || oversized? e.name + "-none" : e.name}
                                                        type="" placeholder="0"
                                                        error={false}
                                                        disabled={oversized || (oneSize && e.name !== "type-size") || (!oneSize && e.name === "type-size")}
                                                        register={register}
                                                        errorData={oversized || (oneSize && e.name !== "type-size") || (!oneSize && e.name === "type-size") ? "" : errors}
                                                        validateProps={getValidateProps({standart: ["required"], custom: ["isNumber"]})}/>

                                                        {(oneSize && e.name !== "type-size") || (!oneSize && e.name === "type-size") || oversized?
                                                        <input type="hidden" name={e.name} ref={register}/> : ""}
                                                        <span className={c.type__text}>{e.unit}</span>
                                                    {e.name === "type-size" ?
                                                        <>
                                                            <input type="checkbox" className="checkbox" id="type-size" onChange={() => setOneSize(!oneSize)}
                                                                   disabled={oversized} ref={register} name="size-exact" defaultChecked={false}/>
                                                            <label htmlFor="type-size"
                                                                   className={c["type__label-checkbox"] + " label-checkbox"}>указать
                                                                объем</label>
                                                        </> : ""
                                                    }
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={c.type__cancel}>
                                    <input type="checkbox" className="checkbox" id="type-cancel" defaultChecked={oversized} name="size-cancel"
                                           ref={register} onChange={() => setOversized(!oversized)}/>
                                    <label htmlFor="type-cancel" className={c["type__label-checkbox"] + " label-checkbox"}>Негабаритный
                                        груз</label>
                                </div>
                            </> : ""
                    }

                </div>
                {typeCargo === "docs"?
                    <div className="type__docs">
                        <label htmlFor="" className="organization__label">
                            Вес:
                        </label>
                        <Radios className={c["type__radios-doc"]} name="weight-doc" inputs={[
                            {beforeId: "type", afterId: "less", value: "1", html: "до 100 г", register},
                            {beforeId: "type", afterId: "400", value: "2", html: "до 400 г", register},
                            {beforeId: "type", afterId: "more", value: "3", html: "свыше 400 г", register},
                        ]} />
                    </div> : ""
                }
            </div>
        </div>
    );
}

export default OrderType;