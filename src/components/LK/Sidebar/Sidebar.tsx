import c from "./Sidebar.module.css";
import React, {useState} from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {AppStateType} from "../../../../redux/reducers";

type PropsType = {
    currentLink: string
}

const Sidebar: React.FC<PropsType> = (props) => {
    const [isActive, setIsActive] = useState(false);

    const { currentLink } = props;

    const { avatar } = useSelector((state:AppStateType) => state.user);

    const { name } = useSelector(state => state.user);

    const links = [
        {link: "/", text: "Текущие заказы"},
        {link: "/history", text: "История заказов"},
        {link: "/book", text: "Адресная книга"},
        {link: "/documents", text: "Отчеты и документы"},
        {link: "/order", text: "Расчеты"},
        {link: "/profile", text: "Профиль и настройки"},
    ];

    return(
        <div className={c.sidebar}>
            <div className={isActive? `${c.sidebar__panel} ${c.sidebar__panel_active}` : c.sidebar__panel}>
                <div className={c.sidebar__burger} onClick={() => setIsActive(!isActive)}>
                    <span className={c["sidebar__burger-line"]} />
                </div>
                <Link href="/">
                    <a className={c["sidebar__logo-mini"]}>
                        <img src="/static/img/lk/sidebar/logo_mini.svg" alt="" />
                    </a>
                </Link>
                <a href="#" className={c.sidebar__exit}>
                    <img src="/static/img/lk/sidebar/exit.svg" alt="" />
                </a>
            </div>
            <div className={isActive? `${c.sidebar__top} ${c.sidebar__top_active}` : c.sidebar__top}>
                <Link href="/">
                    <a className={c["sidebar__logo-link"]}>
                        <img src="/static/img/lk/sidebar/logo.svg" alt="" className={c.sidebar__logo} />
                    </a>
                </Link>
                <div className="info__user info__user_sidebar">
                    <div className="info__user-bg">
                        <img src={avatar? avatar : "/static/img/lk/info/avatar.svg"}  alt="" className="info__avatar" />
                    </div>
                    <div className="info__user-name">
                        {name}
                    </div>
                </div>
            </div>
            <div className={isActive? `${c.sidebar__content} ${c.sidebar__content_active}` : c.sidebar__content}>
                <ul className={c.sedibar__list}>
                    {links.map((l, index) => {
                        return (
                            <li className={l.link === currentLink? `${c.sidebar__elem} ${c.sidebar__elem_active}` : c.sidebar__elem} key={index}>
                                <Link href={"/lk" + l.link}>
                                    <a className={c.sidebar__link}>
                                        <img src={`/static/img/lk/sidebar/icon${index + 1}.svg`} alt="" className={c.sidebar__icon}/>
                                        {l.text}
                                    </a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;