import Select from "../../common/Select/Select";
import Label from "../../common/Label/Lable";
import Input from "../../common/Input/Input";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {getValidateProps} from "../../utils/validate/validate";
import AppendAddress from "./AppendAddress/AppendAddress";
import { useDispatch, useSelector } from "react-redux";
import {AddressType, changeAddress, createNewAddress, getAllAddresses} from "../../../../redux/reducers/book-reducer";
import {ModalTypes} from "../Modal";


type PropsType = {
    setModalType: (modalType: ModalTypes) => void
    closeModal: () => void
}

const AddAddressModal: React.FC<PropsType> = (props) => {
    const [isJuristic, setIsJuristic] = useState("jur");
    const [countAdresses, setCountAddresses] = useState(1);

    //index address for change, if === 0, then do not change
    const indexAddress = useSelector(state => state.book.idAddressForChange);

    //if need to change organization and address
    let addressData: AddressType;
    if(indexAddress) {
        addressData = useSelector(state => state.book.addresses).find((a) => a.id_address === indexAddress);
        console.log(addressData);
    }

    const methods = useForm({
        shouldFocusError: false,
        defaultValues: {
            name_organization: indexAddress && addressData.name_organization? addressData.name_organization : "",
            name: indexAddress && addressData.name? addressData.name : "",
            "city-1": indexAddress && addressData.city? addressData.city : "",
            "street-1": indexAddress && addressData.street? addressData.street : "",
            "home-1": indexAddress && addressData.home? addressData.home : "",
            "corpus-1": indexAddress && addressData.corpus? addressData.corpus : "",
            "structure-1": indexAddress && addressData.structure? addressData.structure : "",
            "apartment-1": indexAddress && addressData.apartment? addressData.apartment : "",
            phone_mobile: indexAddress && addressData.phone_mobile? addressData.phone_mobile : "",
            phone_work: indexAddress && addressData.phone_work? addressData.phone_work : "",
            phone_more: indexAddress && addressData.phone_more? addressData.phone_more : "",
            position: indexAddress && addressData.position? addressData.position : "",
            inn: indexAddress && addressData.inn? addressData.inn : "",
        },
    });
    const { register, errors, handleSubmit } = methods;
    const { setModalType, closeModal } = props;

    const { countNeed, currentPage } = useSelector(state => state.book);

    const dispatch = useDispatch();

    useEffect(() => {
        if(isJuristic === "fis") {
            setCountAddresses(1);
        }
    }, [isJuristic])

    let allAddresses = [];
    for(let i = 0; i < countAdresses; i++) {
        allAddresses.push(<AppendAddress count={countAdresses} setCount={setCountAddresses} key={i} index={i} houseTypeOfAddress={addressData? addressData.house_type : ""}/>)
    }

    const sendForm = async (data) => {
        const dataSend = {
            type_person: data["type-person"],
            name: data.name? data.name : null,
            position: data.position? data.position : null,
            name_organization: data["name_organization"]? data["name_organization"] : null,
            phone_work: data["phone_work"]? data["phone_work"] : null,
            phone_mobile: data["phone_mobile"]? data["phone_mobile"] : null,
            phone_more: data["phone_more"]? data["phone_more"] : null,
            addresses: getArrOfAddresses(data),
            inn: data.inn? data.inn : null,
        }
        if(indexAddress) {
            await sendFormForChange(dataSend, data);
        }else {
            await dispatch(createNewAddress(dataSend));
        }
        await dispatch(getAllAddresses(countNeed, currentPage));
        closeModal();
    }

    const sendFormForChange = (dataSend, data) => {
        dataSend["id_organization"] = data["id_organization"];
        dataSend["id_address"] = data["id_address"];
        dispatch(changeAddress(dataSend));
    }

    const getArrOfAddresses = (data) => {
        let addresses = [];
        for(let i = 0; i < countAdresses; i++) {
            const number = i + 1;
            addresses[i] = {};
            addresses[i]["city"] = data["city-" + number];
            addresses[i]["street"] = data["street-" + number];
            addresses[i]["home"] = data["home-" + number]? data["home-" + number] : null;
            addresses[i]["corpus"] = data["corpus-" + number]? data["corpus-" + number] : null;
            addresses[i]["structure"] = data["structure-" + number]? data["structure-" + number] : null;
            addresses[i]["house_type"] = data["house_type-" + number];
            addresses[i]["apartment"] = data["apartment-" + number]? data["apartment-" + number] : null;
        }
        return addresses;
    }

    const cancelEnter = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <div className="append">
            <div className="append__top modal__top">
                <h2 className="append__title modal__title title-3">
                    Добавление адресата
                </h2>
            </div>
            <FormProvider {...methods}>
                <form action="" className="append__form" onSubmit={handleSubmit(sendForm)}>
                    {
                        indexAddress?
                            <>
                                <input type="hidden" name="id_organization" value={addressData.id_organization} ref={register()}/>
                                <input type="hidden" name="id_address" value={addressData.id_address} ref={register()}/>
                            </> : ""
                    }
                    <div className="append__content modal__content">
                        <div className="append__subtitle title-5">
                            Организация
                        </div>
                        <div className="append__form-top">
                            <div className="append__block append__block_select">
                                <label htmlFor="" className="append__label">
                                    Юр./Физ. лицо:
                                </label>
                                <Select classNameGeneral="append__select"
                                        indexOptionActive={addressData && addressData.type_person === "fis"? 1 : 0}
                                        optionsText={["Юр. лицо", "Физ. лицо"]}
                                        classNameTitle="append__select-top" classNameOption="lk__option_append"
                                        setOption={setIsJuristic} variables={["jur", "fis"]} />
                                <input type="hidden" ref={register()} name="type-person" value={isJuristic}/>
                            </div>
                            <div className="append__block">
                                <label htmlFor="" className="append__label">
                                    Наименование организации <span className="blue">*</span>
                                </label>
                                <Label className="append__label-input append__label-input_name-organization">
                                    <Input className="append__input append__input-name modal__input"
                                           name={isJuristic === "jur" ? "name_organization" : "name_organization-none"}
                                           type="" placeholder="Полное наименование" error={true} register={register}
                                           errorData={errors}
                                           disabled={isJuristic === "fis"}
                                           validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                                    {isJuristic === "fis" ? <input type="hidden" name="name_organization" value={null}
                                                                   ref={register()}/> : ""}
                                </Label>
                            </div>
                        </div>
                        <div className="append__form-middle">
                            <div className="append__block">
                                <label htmlFor="" className="append__label">
                                    Контактное лицо
                                </label>
                                <Label
                                    className="append__label-input append__label-input_middle append__label-input_name label-man_dispatch">
                                    <Input className="append__input modal__input" name="name" type="" placeholder="ФИО"
                                           error={false} register={register}/>
                                </Label>
                                <label htmlFor="" className="append__label">
                                    Рабочий телефон <span className="blue">*</span>
                                </label>
                                <Label
                                    className="append__label-input append__label-input_phone-fixed append__label-input_middle label-phone_dispatch">
                                    <Input className="append__input modal__input"
                                           name={isJuristic === "jur" ? "phone_work" : "phone_work-none"}
                                           type="phone" placeholder="+7 ___ ___-__-__" error={true}
                                           register={register} errorData={errors}
                                           validateProps={getValidateProps({standart: ["required"], custom: []})}
                                           disabled={isJuristic === "fis"}
                                    />
                                    {isJuristic === "fis" ?
                                        <input type="hidden" name="phone_work" value={null} ref={register()}/> : ""}
                                </Label>
                            </div>
                            <div className="append__block append__block_phones">
                                <div className="append__block">
                                    <label htmlFor="" className="append__label">
                                        Должность
                                    </label>
                                    <Label
                                        className="append__label-input append__label-input_position append__label-input_middle">
                                        <Input className="append__input modal__input"
                                               name={isJuristic === "jur" ? "position" : "position-none"}
                                               disabled={isJuristic === "fis"} register={register}
                                               type="" placeholder="Название должности" error={false}/>
                                    </Label>
                                </div>
                                <div className="append__block">
                                    <label htmlFor="" className="append__label">
                                        ИНН
                                    </label>
                                    <Label
                                        className="append__label-input append__label-input_phone-mobile append__label-input_middle">
                                        <Input className="append__input append__input_inn modal__input" name={isJuristic === "jur" ? "inn" : "inn-none"} type=""
                                               placeholder="ИНН контакта" error={true}
                                               disabled={isJuristic === "fis"}
                                               register={register}/>
                                    </Label>
                                </div>
                                <div className="append__block">
                                    <label htmlFor="" className="append__label">
                                        Дополнительный телефон
                                    </label>
                                    <Label
                                        className="append__label-input append__label-input_phone-add append__label-input_middle label-phone_dispatch">
                                        <Input className="append__input modal__input" name="phone_more" type="phone"
                                               placeholder="+7 ___ ___-__-__" error={false}
                                               register={register}/>
                                    </Label>
                                </div>
                                <div className="append__block">
                                    <label htmlFor="" className="append__label">
                                        Мобильный телефон
                                    </label>
                                    <Label
                                        className="append__label-input append__label-input_phone-mobile append__label-input_middle label-phone_dispatch">
                                        <Input className="append__input modal__input" name="phone_mobile" type="phone"
                                               placeholder="+7 ___ ___-__-__" error={true}
                                               register={register}/>
                                    </Label>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" name="count-addresses" value={countAdresses} />
                        <div className="append__subtitle title-5">
                            Адрес
                        </div>
                        {allAddresses}
                        <div className="append__form-subsribe">
                            <div className={isJuristic === "jur" && !indexAddress? "append__form-new link link_green" : "append__form-new_none append__form-new link link_green"}
                                onClick={isJuristic === "jur" && !indexAddress? () => setCountAddresses(countAdresses + 1) : () => ""}>
                                + Добавить филиал
                            </div>
                            <div className="append__form-describe">
                                <span className="blue">*</span> Обязательное для заполнения поле
                            </div>
                        </div>
                    </div>
                    <div className="append__bottom modal__bottom">
                        <button className="append__button append__button_cancel btn btn_blue" onClick={cancelEnter}>
                            Отмена
                        </button>
                        <button className="append__button append__button_save btn btn_green">
                            Сохранить
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}

export default AddAddressModal;