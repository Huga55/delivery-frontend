import React from "react";
import c from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {

    const footerLinks = {
        left: [
            {text: "О компании", href:"/"},
            {text: "Тарифы", href:"/typical/page"},
            {text: "Обратная связь", href:"/feedback"},
            {text: "Контакты", href:"/typical/page"},
        ],
        right: [
            {text: "Партнерская программа", href:"/typical/page"},
            {text: "Оформление доставки", href:"/order"},
            {text: "Договор оферты", href:"/"},
            {text: "Политика конфиденциальности", href:"/"},
        ],
    };

    return (
        <footer className={c.footer} id="footer">
            <img src="/static/img/main/footer/bg.png" alt="" className={`${c.footer__bg} ${c.footer__bg_desktop}`}/>
            <img src="/static/img/main/footer/bg_m.png" alt="" className={`${c.footer__bg} ${c.footer__bg_mobile}`}/>
            <img src="/static/img/main/footer/cube.svg" alt=""
                 className={`${c.footer__cube} ${c.footer__cube_desktop}`}/>
            <img src="/static/img/main/footer/cube_m.png" alt=""
                 className={`${c.footer__cube} ${c.footer__cube_mobile}`}/>
            <div className={c.footer__container + " container"}>
                <a href="/" className={c["footer__logo-link"]}>
                    <img src="/static/img/main/footer/logo.svg" alt="" className={c.footer__logo}/>
                </a>
                <div className={c.footer__top}>
                    <div className={c.footer__left}>
                        <div className={c.footer__subtitle + " title-4"}>
                            Юридический адрес
                        </div>
                        <div className={`${c.footer__address} ${c.footer__text}`}>
                            109387 Россия, Москва, ул. Люблинская, д. 40
                        </div>
                        <div className={`${c.footer__phone} ${c.footer__text}`}>
                            8-800-555-22-41
                        </div>
                    </div>
                    <div className={c.footer__middle}>
                        <div className={c.footer__subtitle + " title-4"}>
                            Еxpress2you
                        </div>
                        <div className={c.footer__links}>
                            <div className={c["footer__links-left"]}>
                                {footerLinks.left.map( (link, index) => {
                                    return(
                                        <Link href={link.href} key={index}>
                                            <a  className={`${c.footer__link} link ${c.footer__text}`}>
                                                {link.text}
                                            </a>
                                        </Link>
                                    );
                                })}
                            </div>
                            <div className={c["footer__links-right"]}>
                                {footerLinks.right.map( (link, index) => {
                                    return(
                                        <Link href={link.href} key={index}>
                                            <a className={`${c.footer__link} link ${c.footer__text}`}>
                                                {link.text}
                                            </a>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={c.footer__right}>
                        <div className={c.footer__subtitle + " title-4"}>
                            График работы
                        </div>
                        <div className={`${c.footer__work} ${c.footer__text}`}>
                            Контакт-центр — с 06:00 до 24:00 без выходных. Оформление заявок на сайте и
                            их исполнение — круглосуточно
                        </div>
                    </div>
                </div>
                <div className={c.footer__bottom}>
                    <div className={c.footer__social}>
                        <a href="#" className={c["footer__social-link"]}>
                            <img src="/static/img/main/footer/fb.svg" alt="" className={c.footer__icon}/>
                        </a>
                        <a href="#" className={c["footer__social-link"]}>
                            <img src="/static/img/main/footer/inst.svg" alt="" className={c.footer__icon}/>
                        </a>
                        <a href="#" className={c["footer__social-link"]}>
                            <img src="/static/img/main/footer/vk.svg" alt="" className={c.footer__icon}/>
                        </a>
                    </div>
                    <div className={c.footer__pay}>
                        Способы оплаты:
                        <img src="/static/img/main/footer/banks.svg" alt="" className={c.footer__banks}/>
                    </div>
                </div>
                <div className={c.footer__subscribe}>
                    © 2003-2020 г. Все права защищены. ООО "ГрандХолдинг" / Grandholding LLC
                </div>
            </div>
        </footer>
    );
}

export default Footer;