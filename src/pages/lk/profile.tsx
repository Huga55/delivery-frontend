import Label from "../../components/common/Label/Lable";
import Input from "../../components/common/Input/Input";
import {FormProvider, useForm} from "react-hook-form";
import Agree from "../../components/common/Agree/Agree";
import LayoutLk from "../../components/layouts/LayoutLk";
import {useDispatch, useSelector} from "react-redux";
import {getValidateProps} from "../../components/utils/validate/validate";
import {changeDataOfUser} from "../../../redux/reducers/lk-reducer";
import {useEffect, useState} from "react";
import {sendAvatar} from "../../../redux/reducers/profile-reducer";
import {AppStateType} from "../../../redux/reducers";


const Profile = () => {
    const [editName, setEditName] = useState(false);
    const [isAgree, setIsAgree] = useState(true);

    const info = useSelector(state => state.user);
    const {nameOfDadata} = useSelector(state => state.user);
    console.log("info", info);
    const methods = useForm({
        shouldFocusError: false,
        defaultValues: {
            name: info.name,
            name_organization: info.name_organization,
            phone: info.phone,
            inn: info.inn,
            ogrn: info.ogrn,
            address: info.address,
        }
    });

    const {register, errors, handleSubmit, setError, setValue, getValues} = methods;

    const orderCount = useSelector((state:AppStateType) => state.user.ordersCount);

    const dispatch = useDispatch();

    useEffect(() => {
        setValue("name_organization", info.nameOrganization, {
            shouldValidate: true,
            shouldDirty: true
        });
        setValue("phone", info.phone, {
            shouldValidate: true,
            shouldDirty: true
        });
        setValue("address", info.address, {
            shouldValidate: true,
            shouldDirty: true
        });
    }, [])

    useEffect(() => {
        if (nameOfDadata) {
            setValue("name_organization", nameOfDadata, {
                shouldValidate: true,
                shouldDirty: true
            });
        }
    }, [nameOfDadata])

    const sendForm = (data) => {
        const dataSend = {...data};
        dataSend["name_organization"] = getValues("name_organization");
        if (dataSend.password === "") {
            dataSend.password = null;
        } else {
            if (dataSend.password !== dataSend.password_double) {
                setError("password", {type: "manual", message: "Введенные пароли не совпадают"});
                return;
            }
        }
        if(dataSend.phone === "") {
            dataSend.phone = info.phone;
        }
        dispatch(changeDataOfUser(dataSend));
    }

    const changeAvatar = (e) => {
        const value = e.currentTarget.files[0];
        console.log(value);
        dispatch(sendAvatar(value));
    }


    return (
        <LayoutLk currentLink={"/profile"}>
            <div className="profile">
                <div className="lk-top profile__top">
                    <h2 className="profile__title title-2">
                        Профиль и настройки
                    </h2>
                </div>
                <div className="profile__window lk__window">
                    <div className="profile__window-content">
                        <div className="profile__info profile__block profile__block_top">
                            <div className="profile__top-left">
                                <img src={info.avatar? info.avatar : "/static/img/lk/profile/ava.svg"} alt="" className="profile__ava"/>
                            </div>
                            <div className="profile__top-right">
                                <div className="profile__name">
                                    {info.name}
                                </div>
                                <label className="profile__change link link_green" htmlFor="change-avatar">
                                    Изменить аватар
                                    <input type="file" name="img" className="profile__change-avatar" id="change-avatar" onChange={(e) => changeAvatar(e)}/>
                                </label>
                            </div>
                        </div>
                        <div className="profile__email profile__block profile__block_top">
                            <div className="profile__top-left">
                                <img src="/static/img/lk/profile/mail.svg" alt="" className="profile__img-email"/>
                            </div>
                            <div className="profile__top-right">
                                <div className="profile__subtitle">
                                    Е-mail
                                </div>
                                <div className="profile__value">
                                    {info.email}
                                </div>
                            </div>
                        </div>
                        <div className="profile__email profile__block profile__block_top">
                            <div className="profile__top-left">
                                <img src="/static/img/lk/profile/cube.svg" alt="" className="profile__img-cube"/>
                            </div>
                            <div className="profile__top-right">
                                <div className="profile__subtitle">
                                    Количество заказов
                                </div>
                                <div className="profile__value">
                                    {orderCount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FormProvider {...methods}>
                    <form className="profile__content lk__content" onSubmit={handleSubmit(sendForm)}>
                        <div className="profile__blocks">
                            <div className="profile__block">
                                <div className="profile__block-title">
                                    Контактная информация
                                </div>
                                <label htmlFor="" className="profile__label">
                                    Имя Фамилия
                                </label>
                                <Label className="profile__label-input label-man_dispatch">
                                    <Input className="profile__input" name="name" type=""
                                           placeholder="Вячеслав Никифоров"
                                           error={true} register={register} errorData={errors}
                                           validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                                </Label>
                                <label htmlFor="" className="profile__label">
                                    Телефон
                                </label>
                                <Label className="profile__label-input label-phone_dispatch">
                                    <Input className="profile__input" name="phone" type="phone"
                                           placeholder={info.phone}
                                           error={true} register={register} errorData={errors}
                                           validateProps={getValidateProps({standart: [], custom: ["profilePhone"]})}/>
                                </Label>
                                <label htmlFor="" className="profile__label">
                                    Адрес
                                </label>
                                <Label className="profile__label-input label_dispatch">
                                    <Input className="profile__input" name="address" type="address"
                                           placeholder="Введите адрес" error={true}
                                           register={register} errorData={errors} autoComplete="off"
                                           validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                                </Label>
                            </div>
                            <div className="profile__block">
                                <div className="profile__block-title">
                                    Идентификационные данные
                                </div>
                                <label htmlFor="" className="profile__label">
                                    ИНН
                                </label>
                                <Label className="profile__label-input">
                                    <Input className="profile__input profile__input_norm" name="inn" type="inn"
                                           placeholder="ИНН" error={true}
                                           register={register} errorData={errors}
                                           validateProps={getValidateProps({standart: [], custom: ["isProfileInn"]})}/>
                                </Label>
                                <label htmlFor="" className="profile__label">
                                    ОГРН
                                </label>
                                <Label className="profile__label-input">
                                    <Input className="profile__input input profile__input_norm" name="ogrn" type=""
                                           placeholder="ОГРН" error={true}
                                           register={register} errorData={errors}
                                           validateProps={getValidateProps({standart: [], custom: ["isProfileOgrn"]})}/>
                                </Label>
                                <label htmlFor="" className="profile__label">
                                    Название организации
                                </label>
                                <Label className="profile__label-input profile__label-input_irregular">
                                    <Input className="profile__input input profile__input_norm" name="name_organization"
                                           type="" placeholder="Название организации" error={true}
                                           register={register} errorData={errors} disabled={!editName}/>
                                </Label>
                                <div className="profile__manual">
                                    <input type="checkbox" className="checkbox" id="profile-manual"
                                           name="profile-manual" onClick={() => setEditName(!editName)}/>
                                    <label htmlFor="profile-manual" className="label-checkbox profile__label-checkbox">
                                        указать вручную
                                    </label>
                                </div>
                            </div>
                            <div className="profile__block">
                                <div className="profile__block-title">
                                    Изменение пароля
                                </div>
                                <label htmlFor="" className="profile__label">
                                    Новый пароль
                                </label>
                                <Label className="profile__label-input">
                                    <Input className="profile__input profile__input_norm" name="password"
                                           type="password"
                                           placeholder="Введите новый пароль" error={true} register={register}
                                           validateProps={getValidateProps({standart: [], custom: ["passwordProfileLength"]})}
                                           errorData={errors}/>
                                </Label>
                                <label htmlFor="" className="profile__label">
                                    Подтверждение нового пароля
                                </label>
                                <Label className="profile__label-input">
                                    <Input className="profile__input profile__input_norm" name="password_double"
                                           type="password"
                                           placeholder="Повторите новый пароль" error={true}
                                           register={register} errorData={errors}/>
                                </Label>
                            </div>
                        </div>
                        <Agree className="label-checkbox profile__label-agree" prefixId="profile"
                               setIsAgree={setIsAgree}>
                            Согласен(-на) на обработку персональных данных согласно политике конфиденциальности
                        </Agree>
                        {isAgree ?
                            <button className="profile__button btn btn_green">
                                Сохранить изменения
                            </button>
                            :
                            <button className="profile__button btn btn_green" onClick={(e) => e.preventDefault()}>
                                Сохранить изменения
                            </button>
                        }

                    </form>
                </FormProvider>
            </div>
        </LayoutLk>
    );
}


export default Profile;