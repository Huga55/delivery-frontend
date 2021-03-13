import Label from "../../../common/Label/Lable";
import Input from "../../../common/Input/Input";
import {getValidateProps} from "../../../utils/validate/validate";
import Select from "../../../common/Select/Select";
import {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";

type PropsType = {
    count: number
    setCount: (count: number) => void
    index: number

    houseTypeOfAddress: string
}

const AppendAddress: React.FC<PropsType> = (props) => {
    const [typeHouse, setTypeHouse] = useState("apartament");

    const { count, setCount, index, houseTypeOfAddress } = props;

    const indexInput = index + 1;

    const { register, errors } = useFormContext();

    //if want to change address and organization
    useEffect(() => {
        if(houseTypeOfAddress) {
            setTypeHouse(houseTypeOfAddress);
        }
    }, [])

    return(
        <div className="append__form-bottom">
            {count > 1 && count - 1 === index? <span className="append__form-close link link_green" onClick={() => setCount(count - 1)}>Удалить доп форму</span> : ""}
            <div className="append__block">
                <label htmlFor="" className="append__label">
                    Город / населенный пункт <span className="blue">*</span>
                </label>
                <Label className="append__label-input append__label-input_city label_dispatch">
                    <Input className="append__input modal__input append__input_long" name={"city-" + indexInput} type="" placeholder="Название города" error={true}
                           register={register} errorData={errors}
                           validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                </Label>
                <label htmlFor="" className="append__label">
                    Улица <span className="link_blue">*</span>
                </label>
                <Label className="append__label-input append__label-input_street label_dispatch">
                    <Input className="append__input modal__input append__input_long" name={"street-" + indexInput} type="" placeholder="Название улицы" error={true}
                           register={register} errorData={errors}
                           validateProps={getValidateProps({standart: ["required"], custom: []})} autoComplete="off"/>
                </Label>
            </div>
            <div className="append__block append__block_adrress">
                <div className="append__block append__block_mini">
                    <label htmlFor="" className="append__label">
                        Дом
                    </label>
                    <Label className="append__label-input append__label-input_house append__label-input_mini">
                        <Input className="append__input modal__input append__input_mini" name={"home-" + indexInput} type="" placeholder="№" error={false}
                               register={register} autoComplete="off"/>
                    </Label>
                </div>
                <div className="append__block append__block_mini">
                    <label htmlFor="" className="append__label">
                        Корпус
                    </label>
                    <Label className="append__label-input append__label-input_corpus append__label-input_mini">
                        <Input className="append__input modal__input append__input_mini" name={"corpus-" + indexInput} type="" placeholder="№" error={false}
                               register={register}/>
                    </Label>
                </div>
                <div className="append__block append__block_mini">
                    <label htmlFor="" className="append__label">
                        Строение
                    </label>
                    <Label className="append__label-input append__label-input_build append__label-input_mini">
                        <Input className="append__input modal__input append__input_mini" name={"structure-" + indexInput} type="" placeholder="№" error={false}
                               register={register}/>
                    </Label>
                </div>
                <div className="append__block append__block_select">
                    <label htmlFor="" className="append__label">
                        Тип помещения
                    </label>
                    <Select optionsText={["Квартира", "Дом"]} classNameGeneral="append__select append__select_room"
                            classNameOption="lk__option_append" setOption={setTypeHouse} variables={["apartament", "house"]}
                            indexOptionActive={houseTypeOfAddress && houseTypeOfAddress === "house"? 1 : 0} />
                    <input type="hidden" name={"house_type-" + indexInput} ref={register()}
                           value={typeHouse}/>
                </div>
                <div className="append__block append__block_mini">
                    <label htmlFor="" className="append__label">
                        Оф./кв.
                    </label>
                    <Label className="append__label-input append__label-input_room append__label-input_mini">
                        <Input className="append__input modal__input append__input_mini"
                               name={typeHouse === "apartament"? "apartment-" + indexInput : "room-none"}
                               type="" placeholder="№" error={false}
                               disabled={typeHouse === "house"} register={register}/>
                        {typeHouse === "house"? <input type="hidden" name={"apartment-" + indexInput} ref={register()} value={null} /> : ""}
                    </Label>
                </div>
            </div>
        </div>
    );
}

export default AppendAddress;