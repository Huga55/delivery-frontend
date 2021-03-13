import c from "./../../styles/feedback.module.css";
import Button from "../components/common/Button/Button";
import Agree from "../components/common/Agree/Agree";
import Label from "../components/common/Label/Lable";
import Input from "../components/common/Input/Input";
import Top from "../components/Main/Top/Top";
import LayoutMain from "../components/layouts/LayoutMain";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCaptcha, sendMessage} from "../../redux/reducers/form-reducer";
import {FormProvider, useForm} from "react-hook-form";
import {getValidateProps} from "../components/utils/validate/validate";
import useError from "../components/hooks/useError";

const feedback = () => {
    const [isAgree, setIsAgree] = useState(true);

    const [blockActive, setBlockActive] = useState(-1);
    const questBoxes = [
        {
            title: "Как заказать доставку?",
            text: "Нами выполняется срочная доставка груза по России. Мы готовы в минимальные сроки\n" +
                "                                    доставить Ваше отправление практически в любую точку РФ и стран СНГ."
        },
        {
            title: "Осуществляете ли Вы срочную доставку по России?",
            text: "Нами выполняется срочная доставка груза по России. Мы готовы в минимальные сроки\n" +
                "                                    доставить Ваше отправление практически в любую точку РФ и стран СНГ."
        },
        {
            title: "Как заказать доставку?",
            text: "Нами выполняется срочная доставка груза по России. Мы готовы в минимальные сроки\n" +
                "                                    доставить Ваше отправление практически в любую точку РФ и стран СНГ."
        },
        {
            title: "Осуществляете ли Вы срочную доставку по России?",
            text: "Нами выполняется срочная доставка груза по России. Мы готовы в минимальные сроки\n" +
                "                                    доставить Ваше отправление практически в любую точку РФ и стран СНГ."
        },
        {
            title: "Как заказать доставку?",
            text: "Нами выполняется срочная доставка груза по России. Мы готовы в минимальные сроки\n" +
                "                                    доставить Ваше отправление практически в любую точку РФ и стран СНГ."
        },
        {
            title: "Как заказать доставку?",
            text: "Нами выполняется срочная доставка груза по России. Мы готовы в минимальные сроки\n" +
                "                                    доставить Ваше отправление практически в любую точку РФ и стран СНГ."
        },
        {
            title: "Осуществляете ли Вы срочную доставку по России?",
            text: "Нами выполняется срочная доставка груза по России. Мы готовы в минимальные сроки\n" +
                "                                    доставить Ваше отправление практически в любую точку РФ и стран СНГ."
        },
        {
            title: "Осуществляете ли Вы срочную доставку по России?",
            text: "Нами выполняется срочная доставка груза по России. Мы готовы в минимальные сроки\n" +
                "                                    доставить Ваше отправление практически в любую точку РФ и стран СНГ."
        },
    ];

    const [captchaError, setCaptchaError] = useState({error: false, message: ""});//errors of captcha input
    const [submitedData, setSubmitedData] = useState({});//for reset inputs after submit success

    const methods = useForm({
        shouldFocusError: false,
        defaultValues: {name: "", title: "", message: "", captcha: "", phone: "", key: ""},
    });

    const {register, handleSubmit, errors, setError, clearErrors, reset, formState: {isSubmitSuccessful}} = methods;

    const dispatch = useDispatch();

    const {captchaSrc, captchaKey} = useSelector(state => state.form);
    const captchaTextError = useSelector(state => state.errors.captchaTextError);

    useEffect(() => {
        updateCaptcha();
    }, []);

    //if there is errors from server after ajax then include errors to input
    useError(captchaTextError, captchaError, setCaptchaError);

    const updateCaptcha = () => {
        dispatch(getCaptcha());
    }

    const submit = async (data) => {
        await dispatch(sendMessage(data));
        setSubmitedData(data);
        clearErrors();
    }

    useEffect(() => {
        if (isSubmitSuccessful && !captchaTextError) {
            //not work how to need from documentation
            //it's method is bag
            reset({name: "", title: "", message: "", captcha: "", phone: ""}); // asynchronously reset your form values
        }
    }, [reset, submitedData, isSubmitSuccessful])

    return (
        <LayoutMain>
            <Top thisPage="Обратная связь"/>
            <section className={c.feedback}>
                <div className="container">
                    <div className={c.feedback__describe + " text"}>
                        В форме обратной связи вы можете задать вопрос о наших услугах, высказать свои замечания и
                        предложения или просто поблагодарить нас за работу. Мы рассматриваем обращения по будним дням с
                        9:00 до 18:00. В скором времени мы обязательно ответим вам.
                    </div>
                    <FormProvider {...methods}>
                        <form className={c.feedback__block} onSubmit={handleSubmit(submit)}>
                            <div className={c.feedback__window}>
                                <div className={c.feedback__form}>
                                    <div className={c.feedback__top}>
                                        <div className={c.feedback__name}>
                                            <label className={c.feedback__label}>
                                                Имя:
                                            </label>
                                            <Label
                                                className={c["feedback__label-icon"] + " label-man_dispatch label_name"}>
                                                <Input className={c.feedback__input} name="name" type=""
                                                       placeholder="ФИО" error={false}
                                                       register={register} errorData={errors}
                                                       validateProps={getValidateProps({
                                                           standart: ["required"],
                                                           custom: []
                                                       })}/>
                                            </Label>
                                        </div>
                                        <div className={c.feedback__mail}>
                                            <label className={c.feedback__label}>
                                                Е-mail:
                                            </label>
                                            <Label
                                                className={c["feedback__label-icon"] + " label_name label-phone_dispatch"}>
                                                <Input className={c.feedback__input} name="phone" type="phone"
                                                       placeholder="+7 ___ ___-__-__" error={false}
                                                       register={register} errorData={errors}
                                                       validateProps={getValidateProps({
                                                           standart: ["required"],
                                                           custom: ["phone"]
                                                       })}/>
                                            </Label>
                                        </div>
                                    </div>
                                    <label className={c.feedback__label}>
                                        Тема:
                                    </label>
                                    <Label>
                                        <Input className={`${c.feedback__input} ${c.feedback__input_title}`}
                                               name="title" type="" placeholder="Вопрос" error={false}
                                               register={register} errorData={errors}
                                               validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                                    </Label>
                                    <label className={c.feedback__label}>
                                        Сообщение:
                                    </label>
                                    <Label>
                                        <Input
                                            className={`${c.feedback__input} ${c.feedback__textarea} ${c.feedback__input_title} input`}
                                            name="message" placeholder="Текст сообщения" error={true}
                                            register={register} errorData={errors} type="textarea"
                                            validateProps={getValidateProps({standart: ["required"], custom: []})}/>
                                    </Label>
                                </div>
                                <img src="static/img/feedback/img.png" alt="" className={c.feedback__img}/>
                            </div>
                            <div className={c.feedback__bg}>
                                <div className={c.feedback__left}>
                                    <div className={c.feedback__captcha}>
                                        <img src={captchaSrc} alt="" className={c["feedback__captcha-img"]}/>
                                        <div className={`${c.feedback__update} link link_green`}
                                             onClick={() => updateCaptcha()}>
                                            <img src="static/img/feedback/return.svg" alt=""
                                                 className={c.feedback__icon}/>
                                            Обновить картинку
                                        </div>
                                    </div>
                                    <Label>
                                        <Input className={c["feedbak__captcha-input"]} name="captcha" type=""
                                               placeholder="Код с картинки" error={true}
                                               register={register} errorData={errors}
                                               validateProps={getValidateProps({standart: ["required"], custom: []})}
                                               setError={captchaError.error ? setError : false}
                                               customError={{type: "", message: captchaError.message}}/>
                                    </Label>
                                    <input type="hidden" name="key" value={captchaKey} ref={register}/>
                                </div>
                                <div className={c.feedback__right}>
                                    <Agree className={`organization__label-checkbox ${c.feedback__agree}`}
                                           prefixId="feedback" setIsAgree={setIsAgree}>
                                        Согласен(-на) на обработку персональных данных согласно политике
                                        конфиденциальности
                                    </Agree>
                                    <Button type="green" className={c.feedback__button} disabled={!isAgree}>
                                        Отправить
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </section>
            <section className={c.quest}>
                <div className={c.quest__bg}/>
                <div className={c.quest__container + " container"}>
                    <h2 className={c.quest__title + " title-2"}>
                        Вопросы-ответы
                    </h2>
                    <div className={c.quest__content}>
                        {
                            questBoxes.map((elem, index) => {
                                return (
                                    <div
                                        className={blockActive === index ? `${c.quest__box} ${c.quest__box_active}` : c.quest__box}
                                        onClick={() => setBlockActive(index)} key={index}>
                                        <div className={c.quest__top}>
                                            <div className={c.quest__subtitle}>
                                                {elem.title}
                                            </div>
                                            <div
                                                className={blockActive === index ? `${c.quest__button} ${c.quest__button_active}` : c.quest__button}>

                                            </div>
                                        </div>
                                        <div
                                            className={blockActive === index ? `${c.quest__bottom} ${c.quest__bottom_active}` : c.quest__bottom}>
                                            {elem.text}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </section>
        </LayoutMain>
    );
}

export default feedback;