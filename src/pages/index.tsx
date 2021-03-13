import c from "./../../styles/home.module.css";
import LayoutMain from "../components/layouts/LayoutMain";
import Radios from "../components/common/Radios/Radios";
import Button from "../components/common/Button/Button";
import Label from "../components/common/Label/Lable";
import Input from "../components/common/Input/Input";
import Link from "next/link";
import Modal from "../components/Modal/Modal";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {FormProvider, useForm, useFormContext} from "react-hook-form";
import {setAddressFromMainPageAction} from "../../redux/reducers/form-reducer";

const Home = () => {
    const [inputValueDispatch, setInputValueDispatch] = useState("");
    const [inputValueDelivery, setInputValueDelivery] = useState("");
    const [modal, setModal] = useState(false);


    const methods = useForm({
        shouldFocusError: false,
    });
    const { handleSubmit, errors, register, getValues } = methods;

    const dataBlockIndex: Array<{name: string; count: string;}> = [
        {name: "доставок", count: "1 439 030"},
        {name: "среднее время подачи курьера", count: "45 минут"},
        {name: "активных курьеров", count: "95 410"},
    ];

    const dispatch = useDispatch();

    const saveAddressesFromMain = () => {
        const addressDispatch = getValues("address-dispatch");
        const addressDelivery = getValues("address-delivery");
        dispatch(setAddressFromMainPageAction(addressDispatch, addressDelivery));
    }

    return (
        <>
            {modal? <Modal type="register" setModal={setModal} /> : ""}
        <LayoutMain>
            <section className={c.general}>
                <div className={c.general__bg + " desktop"}/>
                <div className="container">
                    <div className={c.general__content}>
                        <div className={c.general__left}>
                            <h1 className={c.general__title + " title-1"}>
                                Курьерская служба доставки от 150 ₽
                            </h1>
                            <div className={c.general__subtitle}>
                                Экспресс-доставка по Москве от двери до двери
                            </div>
                        </div>
                        <FormProvider {...methods}>
                        <div className={c.general__right}>
                            <div className={c["general__window-bg"]}/>
                            <div className={c.general__window}>
                                <Label className={c["general__label-dispatch"] + " label_dispatch"}>
                                    <Input className={`${c.general__input} ${c.general__input_dispatch}`} name="address-dispatch" type="address"
                                           placeholder="Адрес доставки" error={true} setInputValue={setInputValueDispatch} value={inputValueDispatch}
                                           autoComplete="off" register={register}/>
                                </Label>
                                <Label className={c["general__label-delivery"] + " label_delivery"}>
                                    <Input className={`${c.general__input} ${c.general__input_delivery}`} name="address-delivery" type="address"
                                           placeholder="Адрес доставки" error={true} setInputValue={setInputValueDelivery} value={inputValueDelivery}
                                           autoComplete="off" register={register}/>
                                </Label>
                                <Radios className={c.general__radios} name="cargo-type-general" inputs={[
                                    {beforeId: "general", afterId: "doc", value: "docs", html: "Документы"},
                                    {beforeId: "general", afterId: "cargo", value: "cargo", html: "Груз"},
                                ]}/>
                                <Link href="/order">
                                    <a onClick={saveAddressesFromMain}>
                                        <Button type="green" className={c.general__button}>
                                            Рассчитать стоимость
                                        </Button>
                                    </a>
                                </Link>
                                <div className={c.general__subscribe}>
                                    Заказ без регистрации, оплата по факту доставки
                                </div>
                            </div>
                        </div>
                        </FormProvider>
                    </div>
                </div>
            </section>
            <section className={c.index}>
                <div className="container">
                    <div className={c.index__content}>
                        <div className={c.index__title}>
                            За последние 3 месяца:
                        </div>
                        {dataBlockIndex.map((elem, index) => {
                            return(
                                <div className={c.index__box} key={index}>
                                    <div className={c.index__left}>
                                        <img src={`static/img/main/index/icon${index + 1}.svg`} alt="" className={c.index__icon}/>
                                    </div>
                                    <div className={c.index__right}>
                                        <div className={`${c.index__numb} title-3`}>{elem.count}</div>
                                        <div className={`${c.index__text} text`}>{elem.name}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className={c.about}>\
                <img src="static/img/main/about/bg.png" alt="" className={c.about__bg}/>
                <div className="container">
                    <h2 className={c.about__title + " title-2"}>
                        Как мы доставляем
                    </h2>
                    <div className={c.about__content}>
                        <div className={c.about__box}>
                            <div className={c.about__top}>
                                <img src="static/img/main/about/icon1.svg" alt="" className={c.about__icon}/>
                            </div>
                            <div className={c.about__subtitle + " title-4"}>Для всех</div>
                            <div className={c.about__time + " text"}>За два часа</div>
                            <div className={c.about__text + " text"}>Ближайший курьер заберёт товары, документы или привезёт
                                забытую вещь. Просто как такси, только дешевле.
                            </div>
                            <Button type="blue" className={c.about__button}>
                                Заказать
                            </Button>
                        </div>
                        <div className={`${c.about__box} ${c.about__box_relative}`}>
                            <div className={c.about__top}>
                                <img src="static/img/main/about/icon2.svg" alt="" className={c.about__icon}/>
                            </div>
                            <div className={c.about__subtitle + " title-4"}>Для ресторанов</div>
                            <div className={c.about__time + " text"}>За 30 минут</div>
                            <div className={c.about__text + " text"}>Курьеры с термосумками дежурят рядом с вашим кафе или
                                рестораном, сразу забирают еду и развозят клиентам.
                            </div>
                            <Button type="blue" className={c.about__button}>
                                Заказать
                            </Button>
                        </div>
                        <div className={c.about__box}>
                            <div className={c.about__top}>
                                <img src="static/img/main/about/icon3.svg" alt="" className={c.about__icon}/>
                            </div>
                            <div className={c.about__subtitle + " title-4"}>Для магазинов</div>
                            <div className={c.about__time + " text"}>В течение дня</div>
                            <div className={c.about__text + " text"}>Утром курьер заберёт товары и до вечера развезёт вашим
                                клиентам. Чем больше адресов, тем ниже цена за каждый.
                            </div>
                            <Button type="blue" className={c.about__button}>
                                Заказать
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className={c.biz}>
                <div className="container">
                    <div className={c.biz__content}>
                        <h2 className={`${c.biz__title} title-2 ${c.biz__title_mobile}`}>
                            Пригодится для бизнеса
                        </h2>
                        <div className={c.biz__left}>
                            <h2 className={`${c.biz__title} title-2 ${c.biz__title_desktop}`}>
                                Пригодится для бизнеса
                            </h2>
                            <div className={c.biz__block}>
                                <div className={c.biz__box}>
                                    <div className={c.biz__wrapper}>
                                        <img src="static/img/main/biz/icon1.svg" alt="" className="biz__icon"/>
                                    </div>
                                    <div className={c.biz__text}>
                                        <div className={c.biz__subtitle + " title-4"}>Выкуп товара за наличные</div>
                                        <div className={c.biz__describe + " text"}>Курьер купит ваш товар за свои, а ему заплатит
                                            ваш покупатель.
                                        </div>
                                    </div>
                                </div>
                                <div className={c.biz__box}>
                                    <div className={c.biz__wrapper}>
                                        <img src="static/img/main/biz/icon2.svg" alt="" className="biz__icon"/>
                                    </div>
                                    <div className={c.biz__text}>
                                        <div className={c.biz__subtitle + " title-4"}>Расчётно-кассовое обслуживание</div>
                                        <div className={c.biz__describe + " text"}>Курьер отправит покупателю чек, даже если у вас
                                            нет кассы.
                                        </div>
                                    </div>
                                </div>
                                <div className={c.biz__box}>
                                    <div className={c.biz__wrapper}>
                                        <img src="static/img/main/biz/icon3.svg" alt="" className="biz__icon"/>
                                    </div>
                                    <div className={c.biz__text}>
                                        <div className={c.biz__subtitle + " title-4"}>Перевод выручки за товар</div>
                                        <div className={c.biz__describe + " text"}>Курьер переведёт деньги от покупателей, которые
                                            не любят предоплату.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button type="green" className={c.biz__button} onClick={() => setModal(true)}>
                                Регистрация
                            </Button>
                        </div>
                        <div className={c.biz__right}>
                            <img src="static/img/main/biz/img.png" alt="" className={c.biz__img}/>
                        </div>
                    </div>
                </div>
            </section>
            <section className={c.plus}>
                <div className="container">
                    <h2 className={c.plus__title + " title-2"}>
                        Ускорит оформление заказа
                    </h2>
                    <div className={c.plus__content}>
                        <div className={c.plus__box}>
                            <div className={c.plus__window}>
                                <div className={c.plus__wrapper}>
                                    <img src="static/img/main/plus/icon1.svg" alt="" className={c.plus__icon}/>
                                </div>
                                <div className={c.plus__subtitle + " title-4"}>Массовая загрузка</div>
                                <div className={c.plus__target + " text"}>Для бизнеса</div>
                                <div className={c.plus__text + " text"}>Бесплатная маршрутизация с учётом веса и времени посещения
                                    адресов
                                </div>
                                <a className={`${c.plus__link} link link_green`} href="#">Подробнее</a>
                            </div>
                            <div className={c.plus__bg} />
                        </div>
                        <div className={c.plus__box}>
                            <div className={c.plus__window}>
                                <div className={c.plus__wrapper}>
                                    <img src="static/img/main/plus/icon2.svg" alt="" className={c.plus__icon}/>
                                </div>
                                <div className={c.plus__subtitle + " title-4"}>Простая интеграция</div>
                                <div className={c.plus__target + " text"}>Для бизнеса</div>
                                <div className={c.plus__text + " text"}>Модули для интеграции с CMS и CRM на InSales, Bitrix,
                                    retailCRM, Wordpress, OpenCart и Shopify
                                </div>
                                <a className={`${c.plus__link} link link_green`} href="#">Подробнее</a>
                            </div>
                            <div className={c.plus__bg} />
                        </div>
                        <div className={c.plus__box}>
                            <div className={c.plus__window}>
                                <div className={c.plus__wrapper}>
                                    <img src="static/img/main/plus/icon3.svg" alt="" className={c.plus__icon}/>
                                </div>
                                <div className={c.plus__subtitle + " title-4"}>API-интеграция</div>
                                <div className={c.plus__target + " text"}>Для бизнеса</div>
                                <div className={c.plus__text + " text"}>Возможность интеграции для бизнеса с самописной системой
                                    оформления заказов
                                </div>
                                <a className={`${c.plus__link} link link_green`} href="#">Подробнее</a>
                            </div>
                            <div className={c.plus__bg} />
                        </div>
                    </div>
                </div>
            </section>
            <section className={c.advantage}>
                <div className="container">
                    <h2 className={c.advantage__title + " title-2"}>
                        Grandholding — это революция на рынке срочной курьерской доставки
                    </h2>
                    <div className={c.advantage__content}>
                        <div className={c.advantage__box}>
                            <div className={c.advantage__left}/>
                            <div className={c.advantage__right + " text"}>Мгновенный расчёт стоимости в форме заказа, цена
                                обновляется в процессе заполнения формы
                            </div>
                        </div>
                        <div className={c.advantage__box}>
                            <div className={c.advantage__left}/>
                            <div className={c.advantage__right + " text"}>За 7 минут назначим на заказ ближайшего курьера с самым
                                высоким рейтингом
                            </div>
                        </div>
                        <div className={c.advantage__box}>
                            <div className={c.advantage__left}/>
                            <div className={c.advantage__right + " text"}>Оформить заказ на курьерскую или грузовую доставку можно
                                без регистрации и договора
                            </div>
                        </div>
                        <div className={c.advantage__box}>
                            <div className={c.advantage__left}/>
                            <div className={c.advantage__right + " text"}>Маршрут по доставке можно менять на ходу. Все изменения
                                мгновенно отображаются у курьера
                            </div>
                        </div>
                        <div className={c.advantage__window}>
                            <div className={c.advantage__subtitle + " title-4"}>
                                Получите расчет стоимости доставки прямо сейчас
                            </div>
                            <Button type="green" className={c.advantage__button}>
                                Рассчитать стоимость
                            </Button>
                        </div>
                        <div className={c.advantage__box}>
                            <div className={c.advantage__left}/>
                            <div className={c.advantage__right + " text"}>Оплачивать доставку можно картой на любом из адресов
                                заказа. Для юрлиц доступен безнал
                            </div>
                        </div>
                        <div className={c.advantage__box}>
                            <div className={c.advantage__left}/>
                            <div className={c.advantage__right + " text"}>Смс-уведомления на каждом адресе по мере выполнения
                                заказа
                            </div>
                        </div>
                        <div className={c.advantage__box}>
                            <div className={c.advantage__left}/>
                            <div className={c.advantage__right + " text"}>Доставим документы, покупки, технику, мебель, любой
                                крупногабаритный груз весом до 1,5 т
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={c.partners}>
                <div className="container">
                    <div className={c.partners__window}>
                        <h2 className={c.partners__title + " title-2"}>
                            Партнеры
                        </h2>
                        <img src="static/img/main/partners/img.png" alt="" className={c.partners__img}/>
                        <div className={c.partners__dots + " dots"}>
                            <span className={c.partner__dot + " dot"} />
                            <span className={c.partner__dot + " dot"} />
                            <span className={c.partner__dot + " dot"} />
                            <span className={c.partner__dot + " dot"} />
                            <span className={c.partner__dot + " dot"} />
                        </div>
                    </div>
                </div>
            </section>
            <section className={c.work}>
                <div className="container">
                    <h2 className={c.work__title + " title-2"}>
                        Grandholding —<br /> инновационная курьерская служба экспресс-доставки день в день!
                    </h2>
                    <div className={c.work__content}>
                        <div className={c.work__left}>
                            <div className={c.work__bg}>
                                <img src="static/img/main/work/icon.svg" alt="" className={c.work__icon}/>
                            </div>
                            <div className={c.work__window}>
                                <a href="#" className={`${c.work__link} link link_green`}>
                                    Как работает Грандхолдинг
                                </a>
                            </div>
                        </div>
                        <div className={c.work__right}>
                            <div className={c.work__text + " text"}>
                                С 2012 года компания «Грандхолдинг» успешно предоставляет услуги срочной курьерской
                                доставки по Москве как для физических, так и для юридических лиц, а также является
                                надежным логистическим партнером по услугам доставки для интернет-магазинов и
                                ресторанов!
                            </div>
                            <div className={c.work__text + " text"}>
                                Экспресс доставка документов и посылок для организаций, срочная доставка
                                корреспонденции, покупок, цветов, еды, подарков и грузов до 1,5 т. — наиболее частые
                                заказы в нашей компании.
                            </div>
                            <div className={c.work__text + " text"}>
                                Но при этом мы не ограничиваем спектр курьерских услуг и без проблем можем купить и
                                привезти товары и продукты из интернет-магазина, организовать доставку для
                                интернет-магазина, кафе, супермаркета, ресторана или любого другого бизнеса.
                            </div>
                            <div className={c.work__text + " text"}>
                                Круглосуточно на нашем сайте вы можете вызвать курьера всего за минуту и оформить
                                срочную курьерскую доставку без лишней бюрократии, переговоров и звонков в колл-центр.
                                Вы можете заказать как пешего, так и курьера на личном авто. Наша служба экспресс
                                доставки день в день качественно делает свою работу и обеспечивает низкую стоимость
                                курьерских услуг.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutMain>
            </>
    );
}


export default Home;