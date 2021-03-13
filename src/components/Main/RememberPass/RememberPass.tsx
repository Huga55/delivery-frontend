import c from "../../Modal/AuthModal/AuthModal.module.css";
import Label from "../../common/Label/Lable";
import Input from "../../common/Input/Input";
import {getValidateProps} from "../../utils/validate/validate";
import Agree from "../../common/Agree/Agree";
import Button from "../../common/Button/Button";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {sendEmailRemember, setEmailErrorAction} from "../../../../redux/reducers/remember-reducer";


const RememberPass = () => {
    const [isAgree, setIsAgree] = useState(true);

    const {register, handleSubmit, setError, errors} = useForm();

    const dispatch = useDispatch();

    const { isErrorEmail, isSendMessage } = useSelector(state => state.remember);

    const getFormData = (data) => {
        console.log(data);
        dispatch(sendEmailRemember({...data}));
    }

    useEffect(() => {
        if(isErrorEmail) {
            setError("email", {type: "manual", message: isErrorEmail});
            dispatch(setEmailErrorAction(null))
        }
    }, [isErrorEmail])

    return (
                <form className={c.author__form + " modal__form"} onSubmit={handleSubmit(getFormData)}>
                    {isSendMessage ?
                        <span>На ваш email: отправлено сообщение с дальнейшими инструкциями.</span> :
                        <>
                        <Label>
                            <Input className={c.author__input + " modal__input"} name="email" type=""
                                   placeholder="Е-mail"
                                   error={true}
                                   register={register} errorData={errors}
                                   validateProps={getValidateProps({standart: ["required"], custom: []})}
                                   customError={{type: "", message: ""}}/>
                        </Label>
                        <Agree className={c.author__agree} prefixId="author" setIsAgree={setIsAgree}>
                        <span className="agree_text">
                        Согласен(-на) на обработку персональных данных согласно <a href="#"
                        className="link_green">политике конфиденциальности</a>
                        </span>
                        </Agree>
                        <Button type="green" className={c.author__button + " modal__button"} disabled={!isAgree}>
                        Восстановить пароль
                        </Button>
                        </>
                    }
                </form>
    );
}

export default RememberPass;