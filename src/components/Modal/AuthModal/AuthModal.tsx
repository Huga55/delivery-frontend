import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import c from "./AuthModal.module.css";
import Input from "../../common/Input/Input";
import Agree from "../../common/Agree/Agree";
import Button from "../../common/Button/Button";
import {useForm} from "react-hook-form";
import Label from "../../common/Label/Lable";
import {getValidateProps} from "../../utils/validate/validate";
import { useDispatch, useSelector } from "react-redux";
import {authOfUser} from "../../../../redux/reducers/profile-reducer";
import useError from "../../hooks/useError";
import {useRouter} from "next/router";
import {ModalTypes} from "../Modal";
import RememberPass from "../../Main/RememberPass/RememberPass";

type PropsType = {
    setModalType: Dispatch<SetStateAction<ModalTypes>>
}

const AuthModal: React.FC<PropsType> = (props) => {
    const [isAgree, setIsAgree] = useState(true);
    const [isRemember, setIsRemember] = useState(false);
    const [passwordError, setPasswordError] = useState({error: false, message: ""});//error from server after ajax
    const { register, handleSubmit, errors, setError } = useForm({criteriaMode: "all"});
    const { setModalType } = props;

    const changeModal = (e) => {
        e.preventDefault();
        setModalType("register");
    }

    const dispatch = useDispatch();
    const passwordTextError = useSelector(state => state.errors.passwordTextError);//error from server of inputs password and email
    const isAuth = useSelector(state => state.initialize.isAuth);

    const router = useRouter();

    if(isAuth) {
        router.push("/lk");
    }

    useError(passwordTextError, passwordError, setPasswordError);

    const getFormData = (data) => {
        const { email, password } = data;
        dispatch(authOfUser(email, password));
    }

    return (
        <div className={c.author}>
            <div className={c.author__top + " modal__top"}>
                <h2 className={c.author__title + " modal__title title-3"}>
                    Вход
                </h2>
            </div>
            <div className={c.author__content + " modal__content"}>
                {isRemember ? <RememberPass /> :
                    <form className={c.author__form + " modal__form"} onSubmit={handleSubmit(getFormData)}>
                        <Label>
                            <Input className={c.author__input + " modal__input"} name="email" type=""
                                   placeholder="Е-mail" error={true}
                                   register={register} errorData={errors}
                                   validateProps={getValidateProps({standart: ["required"], custom: []})}
                                   setError={passwordError.error ? setError : false}
                                   customError={{type: "", message: ""}}/>
                        </Label>
                        <Label>
                            <Input className={c.author__input + " modal__input"} name="password" type=""
                                   placeholder="Пароль" error={true}
                                   register={register} errorData={errors}
                                   validateProps={getValidateProps({standart: ["required"], custom: []})}
                                   setError={passwordError.error ? setError : false}
                                   customError={{type: "", message: passwordError.message}}/>
                        </Label>
                        <a href="#" className={c.author__remember + " link link_green"} onClick={(e) => {
                            e.preventDefault();
                            setIsRemember(true)
                        }}>
                            Забыли пароль?
                        </a>
                        <Agree className={c.author__agree} prefixId="author" setIsAgree={setIsAgree}>
                        <span className="agree_text">
								Согласен(-на) на обработку персональных данных согласно <a href="#"
                                                                                           className="link_green">политике конфиденциальности</a>
                        </span>
                        </Agree>
                        <Button type="green" className={c.author__button + " modal__button"} disabled={!isAgree}>
                            Войти
                        </Button>
                    </form>
                }
            </div>
            <div className="modal__bottom">
                <a href="#" className={c.register__link + " modal__link link link_green"} onClick={changeModal}>
                    Регистрация
                </a>
            </div>
        </div>
    );
}

export default AuthModal;