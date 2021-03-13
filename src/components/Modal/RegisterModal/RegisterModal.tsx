import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import c from "./RegisterModal.module.css";
import Input from "../../common/Input/Input";
import Agree from "../../common/Agree/Agree";
import Button from "../../common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {FormProvider, useForm} from "react-hook-form";
import {getValidateProps} from "../../utils/validate/validate";
import Label from "../../common/Label/Lable";
import {registerOfUser} from "../../../../redux/reducers/profile-reducer";
import useError from "../../hooks/useError";
import {ModalTypes} from "../Modal";
import {setIsRegisterAction} from "../../../../redux/reducers/modal-reducer";

type PropsType = {
    setModalType: Dispatch<SetStateAction<ModalTypes>>
}

const RegisterModal: React.FC<PropsType> = (props) => {
    const [typeActive, setTypeActive] = useState("fisical");//type for registration fis or jur
    const [emailError, setEmailError] = useState({error: false, message: ""});//errors of email input
    const [phoneError, setPhoneError] = useState({error: false, message: ""});//errors of phone input
    const [innError, setInnError] = useState({error: false, message: ""});//errors of inn input
    const [ogrnError, setOgrnError] = useState({error: false, message: ""});//errors of ogrn input
    const [isAgree, setIsAgree] = useState(true);
    const {setModalType} = props;

    const changeModal = () => {
        setModalType("auth");
    }

    const methods = useForm({shouldFocusError: false});
    const {register, handleSubmit, errors, setError, setValue} = methods;

    const dispatch = useDispatch();
    const {emailTextError, phoneTextError, innTextError, ogrnTextError} = useSelector(state => state.errors);//error from server of input email
    const isRegister = useSelector(state => state.modal.isRegister);//flag of register success
    const {nameOfDadata} = useSelector(state => state.user);

    //if there is errors from server after ajax then include errors to input
    useError(emailTextError, emailError, setEmailError);
    useError(phoneTextError, phoneError, setPhoneError);
    useError(innTextError, innError, setInnError);
    useError(ogrnTextError, ogrnError, setOgrnError);

    //if register success then open auth modal window
    useEffect(() => {
        if (isRegister) {
            dispatch(setIsRegisterAction(false));
            changeModal();
        }
    }, [isRegister])

    useEffect(() => {
        setValue("nameOrganization", nameOfDadata, {
            shouldValidate: true,
            shouldDirty: true
        })
    }, [nameOfDadata])

    //submit of form and send data to server
    const submit = async (data) => {
        if (!isAgree) {
            return;
        }
        data.isJuristic = typeActive === "jur";
        if (data.isJuristic) {
            dispatch(registerOfUser(data.name, data.password, data.phone, data.email, data.isJuristic, data.nameOrganization, data.inn, data.ogrn, data.address));
        } else {
            dispatch(registerOfUser(data.name, data.password, data.phone, data.email, data.isJuristic));
        }
    }

    return (
        <div className={c.resgister}>
            <div className={c.register__top + " modal__top"}>
                <h2 className={c.register__title + " modal__title title-3"}>
                    Регистрация
                </h2>
            </div>
            <div className={c.register__content + " modal__content"}>
                <div className={c.register__options}>
                    <div
                        className={typeActive === "fisical" ? `${c.register__option} ${c.register__option_fis} ${c.register__option_active}` :
                            `${c.register__option} ${c.register__option_fis}`}
                        data-option="register-fis" onClick={() => setTypeActive("fisical")}>
                        Для физлиц
                    </div>
                    <div
                        className={typeActive === "jur" ? `${c.register__option} ${c.register__option_jur} ${c.register__option_active}` :
                            `${c.register__option} ${c.register__option_jur}`}
                        data-option="register-jur" onClick={() => setTypeActive("jur")}>
                        Для юрлиц
                    </div>
                </div>
                <FormProvider {...methods}>
                    <form action="" className={`${c.register__form} ${c.register__form_active} modal__form`}
                          onClick={handleSubmit(submit)}>

                            <>
                                <Label>
                                    <Input className={c.register__input + " modal__input"} name="name" type=""
                                           placeholder="ФИО"
                                           error={false} register={register} errorData={errors}
                                           validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                                </Label>
                                <Label>
                                    <Input className={c.register__input + " modal__input"} name="phone" type="phone"
                                           placeholder="+7 ___ ___-__-__" error={true} register={register}
                                           errorData={errors}
                                           validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                                </Label>
                                <Label>
                                    <Input className={c.register__input + " modal__input"} name="email" type=""
                                           placeholder="Е-mail"
                                           error={true} register={register} errorData={errors}
                                           validateProps={getValidateProps({standart: ["required"], custom: []})}
                                           setError={emailError.error ? setError : false}
                                           customError={{type: "", message: emailError.message}}/>
                                </Label>
                                {typeActive === "jur" ?
                                    <>
                                        <Label>
                                            <Input className={c.register__input + " modal__input"} name="inn" type="inn"
                                                   placeholder="ИНН"
                                                   error={true} register={register} errorData={errors}
                                                   validateProps={getValidateProps({
                                                       standart: ["required"],
                                                       custom: ["isInn"]
                                                   })}
                                                   setError={innError.error ? setError : false}
                                                   customError={{type: "", message: innError.message}}/>
                                        </Label>
                                        <Label>
                                            <Input className={c.register__input + " modal__input"}
                                                   name="nameOrganization"
                                                   type=""
                                                   placeholder="Название организации" error={true} register={register}
                                                   errorData={errors}
                                                   validateProps={getValidateProps({
                                                       standart: ["required"],
                                                       custom: []
                                                   })}/>
                                        </Label>
                                        <Label>
                                            <Input className={c.register__input + " modal__input"} name="ogrn" type=""
                                                   placeholder="ОГРН"
                                                   error={true} register={register} errorData={errors}
                                                   validateProps={getValidateProps({
                                                       standart: ["required"],
                                                       custom: ["isOgrn"]
                                                   })}
                                                   setError={ogrnError.error ? setError : false}
                                                   customError={{type: "", message: ogrnError.message}}/>
                                        </Label>
                                        <Label>
                                            <Input className={c.register__input + " modal__input"} name="address"
                                                   type="address"
                                                   placeholder="Адрес" error={false} register={register}
                                                   errorData={errors}
                                                   validateProps={getValidateProps({
                                                       standart: ["required"],
                                                       custom: []
                                                   })}/>
                                        </Label>
                                    </>
                                    : ""
                                }
                                <Label>
                                    <Input className={c.register__input + " modal__input"} name="password" type=""
                                           placeholder="Пароль" error={true} register={register} errorData={errors}
                                           validateProps={getValidateProps({
                                               standart: ["required"],
                                               custom: ["passwordLength"]
                                           })}/>
                                </Label>
                            </>
                        <Agree className={c.register__agree} prefixId="register" setIsAgree={setIsAgree}>
                            <span className="agree_text">
								Согласен(-на) на обработку персональных данных согласно <a href="#"
                                                                                           className="link_green">политике конфиденциальности</a>
                                </span>
                        </Agree>
                        <Button type="green" className={c.register__button + " modal__button"} disabled={!isAgree}>
                            Зарегистрироваться
                        </Button>
                    </form>
                </FormProvider>

            </div>
            <div className="modal__bottom">
                <span className={c.register__link + " modal__link link link_green"} onClick={changeModal}>
                    Вход
                </span>
            </div>
        </div>
    );
}

export default RegisterModal;