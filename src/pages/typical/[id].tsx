import c from "./../../../styles/typical.module.css";
import Top from "../../components/Main/Top/Top";
import LayoutMain from "../../components/layouts/LayoutMain";

const TypicalPage = () => {
    const tableData = [
        ["Вес, кг", "Зона 1", "Зона 2", "Зона 3", "Зона 4", "Зона 5", ],
        ["0,5", "1010", "1596", "1848", "1987", "2198", ],
        ["0,5", "1010", "1596", "1848", "1987", "2198", ],
        ["0,5", "1010", "1596", "1848", "1987", "2198", ],
        ["0,5", "1010", "1596", "1848", "1987", "2198", ],
    ];

    return (
        <LayoutMain>
            <Top thisPage="Типовая страница" />
            <section className={c.page}>
                <img src="/static/img/page/img.png" alt="" className={c.page__img}/>
                <div className="container">
                    <div className={c.page__top}>
                        <div className={c["page__top-left"]}>
                            <div className={c["page__top-text"] + " text"}>
                                Мы делаем доставку в точности в то время, которое вам нужно — можем начать выполнять
                                заказ через несколько минут после его поступления, или можем сделать доставку в
                                определенный день и час. Чтобы сделать срочную доставку так быстро, как это возможно, мы
                                сотрудничаем с курьерами, оснащенными GPS устройствами.
                            </div>
                            <div className="text">
                                Когда вы делаете заказ, наша система находит ближайшего к вам свободного курьера, и он
                                сразу начинает выполнять заказ, пользуясь рассчитанным нами оптимальным маршрутом.
                            </div>
                        </div>
                        <div className={c["page__top-right"]}>
                            <span className={c["page__top-quote"]}/>
                            <span className={c["page__top-line"]}/>
                            Оплатить заказ возможно наличными курьеру или безналичным расчетом. При наличной оплате не
                            предоставляется иных документов об оплате, кроме расписки курьера с указанием ФИО,
                            паспортных данных и указания услуги.
                        </div>
                    </div>
                    <h1 className={c.page__title + " title-1"}>
                        Юридические документы Н1
                    </h1>
                    <div className={c.page__contract}>
                        <div className={c["page__contact-left"]}>
                            <div className={c["page__contact-top"]}>
                                <div className={c["page__contract-icon"]}/>
                                <div className={c["page__contract-size"]}>
                                    1,5 Мб
                                </div>
                            </div>
                            <div className={c["page__contract-name"] + " text"}>
                                Договор возмездного оказания курьерских услуг с приложениями
                            </div>
                            <a className={c["page__contact-link"] + " link link_green"}>
                                Скачать
                            </a>
                        </div>
                        <div className={c["page__contact-right"]}>
                            <h3 className={c["page__contact-title"] + " title-3"}>
                                Заключение договора Н3
                            </h3>
                            <div className={c["page__contract-text"] + " text"}>
                                В данном разделе собран весь пакет документов, которые необходимы для оформления
                                перевозки и получения грузов. При заключении договора с нашей компанией вы получаете
                                возможность участвовать в системе скидок, оплачивать услуги безналичным расчетом,
                                пользоваться услугами личного кабинета. Мы рады новым клиентам! Чтобы заключить договор
                                с нами необходимо на странице «Заключить договор» заполнить заявку. Менеджер свяжется с
                                вами в течение дня и обсудит все условия сотрудничества. Для оплаты наших услуг по
                                безналичному расчету требуется заключение договора. Номер договора является клиентским
                                кодом вашей компании в системе Еxpress2you.
                            </div>
                        </div>
                    </div>
                    <div className={c["page__tariff-title"]}>
                        Все тарифы Н5
                    </div>
                    <table className={c.page__table}>
                        {tableData.map( (row, index) => {
                            return(
                                <tr className={c.page__row}>
                                    {row.map( (text) => {
                                        return(
                                            index === 0? <th className={c["page__cell-head"]}>{text}</th> :
                                                <td className={c.page__cell}>{text}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </table>
                    <div className={c.page__subscribe}>
                        Тарифы указаны в рублях без учета НДС и топливной надбавки.
                    </div>
                    <div className={c.page__service}>
                        <div className={c.possibility}>
                            <div className={c.possibility__title + " title-4"}>
                                Все возможности сервиса Н4
                            </div>
                            <ul className={c.possibility__list}>
                                <li className={c.possibility__elem}>
                                    <span className={c.possibility__icon}/>
                                    <div className={c.possibility__text}>Научим оформлять десятки доставок в пару кликов</div>
                                </li>
                                <li className={c.possibility__elem}>
                                    <span className={c.possibility__icon}/>
                                    <div className={c.possibility__text}>Срочно доставим за 1-3 часа</div>
                                </li>
                                <li className={c.possibility__elem}>
                                    <span className={c.possibility__icon}/>
                                    <div className={c.possibility__text}>Доставим в удобное вам время</div>
                                </li>
                                <li className={c.possibility__elem}>
                                    <span className={c.possibility__icon}/>
                                    <div className={c.possibility__text}>Выкупим нужные товары в любом магазине</div>
                                </li>
                                <li className={c.possibility__elem}>
                                    <span className={c.possibility__icon}/>
                                    <div className={c.possibility__text}>Переведём вам деньги от ваших покупателей</div>
                                </li>
                                <li className={c.possibility__elem}>
                                    <span className={c.possibility__icon}/>
                                    <div className={c.possibility__text}>Отправим чек покупателям, которые платят наличными
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={c.services}>
                            <div className={c.services__title + " title-4"}>
                                Все сервисы Н4
                            </div>
                            <ul className={c.services__list}>
                                <li className={c.services__elem}>
                                    <div className={c.services__numb}>01.</div>
                                    <div className={c.services__text}>Отправим смс-уведомления вашим получателям</div>
                                </li>
                                <li className={c.services__elem}>
                                    <div className={c.services__numb}>02.</div>
                                    <div className={c.services__text}>Покажем, где ваш курьер на карте города</div>
                                </li>
                                <li className={c.services__elem}>
                                    <div className={c.services__numb}>03.</div>
                                    <div className={c.services__text}>Отчитаемся по каждому заказу в личном кабинете</div>
                                </li>
                                <li className={c.services__elem}>
                                    <div className={c.services__numb}>04.</div>
                                    <div className={c.services__text}>Полная компенсация объявленной ценности</div>
                                </li>
                                <li className={c.services__elem}>
                                    <div className={c.services__numb}>05.</div>
                                    <div className={c.services__text}>Оперативная поддержка в чате или по почте</div>
                                </li>
                                <li className={c.services__elem}>
                                    <div className={c.services__numb}>06.</div>
                                    <div className={c.services__text}>Интеграция по API: вручную и с помощью модулей</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={c.page__bottom}>
                        <div className={c["page-nav"]}>
                            <div className={c["page-nav__bg"]}/>
                            <div className={c["page-nav__window"]}>
                                <div className={c["page-nav__title"]}>
                                    О компании
                                </div>
                                <ul className={c["page-nav__list"]}>
                                    <li className={c["page-nav__elem"] + " text"}>Миссия</li>
                                    <li className={c["page-nav__elem"] + " text"}>Лицензии и свидетельства</li>
                                    <li className={c["page-nav__elem"] + " text"}>Преимущества</li>
                                    <li className={c["page-nav__elem"] + " text"}>Отзывы</li>
                                    <li className={c["page-nav__elem"] + " text"}>Работа у нас</li>
                                    <li className={c["page-nav__elem"] + " text"}>Наша география</li>
                                </ul>
                            </div>
                        </div>
                        <div className={c["page-add"]}>
                            <div className={c["page-add__title"] + " title-2"}>
                                Дополнительные услуги Н2
                            </div>
                            <div className={c["page-add__wrapper"]}>
                                <div className={c["page-add__select"]}>
                                    <div className={`${c["page-add__option"]} ${c["page-add__option_active"]}`} data-option="option-1">Быстрая
                                        доставка
                                    </div>
                                    <div className={c["page-add__option"]} data-option="option-2">Тяжелый груз</div>
                                    <div className={c["page-add__option"]} data-option="option-3">По России</div>
                                    <div className={c["page-add__option"]} data-option="option-4">За рубеж</div>
                                </div>
                            </div>
                            <div className={`${c["page-add__block"]} ${c["page-add__block_active"]} text`} data-block="option-1">
                                <div className={c["page-add__text"]}>Доставка на следующий день в Москву, Санкт-Петербург,
                                    Новосибирск и еще 200 городов России. В пределах административных границ: например,
                                    для Москвы внутри МКАД, внутри КАД для Санкт-Петербурга.
                                </div>
                                <div className={c["page-add__text"]}>Лучшее решение для доставки любых видов экспресс-почты, от
                                    пакета до габаритного груза! Данный вид сервиса особенно удобен для рассылки
                                    большого количества писем или посылок одновременно.
                                </div>
                                <div className={c["page-add__text"]}>Мы оказываем людям и компаниям спектр услуг своевременной и
                                    гарантированной доставки, постоянно повышая уровень сервиса, внедряя новые
                                    технологии, эффективно используя внутренний потенциал и внешние ресурсы.1
                                </div>
                            </div>
                            <div className={c["page-add__block"] + " text"} data-block="option-2">
                                <div className={c["page-add__text"]}>Доставка на следующий день в Москву, Санкт-Петербург,
                                    Новосибирск и еще 200 городов России. В пределах административных границ: например,
                                    для Москвы внутри МКАД, внутри КАД для Санкт-Петербурга.
                                </div>
                                <div className={c["page-add__text"]}>Лучшее решение для доставки любых видов экспресс-почты, от
                                    пакета до габаритного груза! Данный вид сервиса особенно удобен для рассылки
                                    большого количества писем или посылок одновременно.
                                </div>
                                <div className={c["page-add__text"]}>Мы оказываем людям и компаниям спектр услуг своевременной и
                                    гарантированной доставки, постоянно повышая уровень сервиса, внедряя новые
                                    технологии, эффективно используя внутренний потенциал и внешние ресурсы.2
                                </div>
                            </div>
                            <div className={c["page-add__block"] + " text"} data-block="option-3">
                                <div className={c["page-add__text"]}>Доставка на следующий день в Москву, Санкт-Петербург,
                                    Новосибирск и еще 200 городов России. В пределах административных границ: например,
                                    для Москвы внутри МКАД, внутри КАД для Санкт-Петербурга.
                                </div>
                                <div className={c["page-add__text"]}>Лучшее решение для доставки любых видов экспресс-почты, от
                                    пакета до габаритного груза! Данный вид сервиса особенно удобен для рассылки
                                    большого количества писем или посылок одновременно.
                                </div>
                                <div className={c["page-add__text"]}>Мы оказываем людям и компаниям спектр услуг своевременной и
                                    гарантированной доставки, постоянно повышая уровень сервиса, внедряя новые
                                    технологии, эффективно используя внутренний потенциал и внешние ресурсы.3
                                </div>
                            </div>
                            <div className={c["page-add__block"] + " text"} data-block="option-4">
                                <div className={c["page-add__text"]}>Доставка на следующий день в Москву, Санкт-Петербург,
                                    Новосибирск и еще 200 городов России. В пределах административных границ: например,
                                    для Москвы внутри МКАД, внутри КАД для Санкт-Петербурга.
                                </div>
                                <div className={c["page-add__text"]}>Лучшее решение для доставки любых видов экспресс-почты, от
                                    пакета до габаритного груза! Данный вид сервиса особенно удобен для рассылки
                                    большого количества писем или посылок одновременно.
                                </div>
                                <div className={c["page-add__text"]}>Мы оказываем людям и компаниям спектр услуг своевременной и
                                    гарантированной доставки, постоянно повышая уровень сервиса, внедряя новые
                                    технологии, эффективно используя внутренний потенциал и внешние ресурсы.4
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutMain>
    );
}

export default TypicalPage;