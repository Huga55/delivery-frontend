import React, {useState} from "react";
import c from "./Header.module.css";
import Button from "../../common/Button/Button";
import Link from "next/link";
import Modal from "../../Modal/Modal";

const Header = () => {
    const [navState, setNavState] = useState(false);
    const [modal, setModal] = useState(false);

    return(
        <>
            {modal? <Modal type="auth" setModal={setModal} /> : ""}
        <header className={c.header} id="header">
            <div className={c.header__bg} />
            <div className={c.header__container + " container"}>
                <div className={c.header__content}>
                    <div className={c.header__left}>
                        <Link href="/">
                            <a className={c["header__logo-link"]}>
                                <img src="/static/img/main/header/logo.svg" alt="" className={c.header__logo} />
                            </a>
                        </Link>
                        <div className={c.header__name + " title-3"}>
                            Express2You
                        </div>
                    </div>
                    <div className={navState? `${c.burger} ${c.burger_active}` : c.burger} onClick={() => setNavState(!navState)}>
						<span className={c.burger__line} />
                    </div>
                    <div className={navState? `${c.header__right} ${c.header__right_active}` : c.header__right}>
                        <div className={c.header__phone}>
                            8-800-555-22-41
                        </div>
                        <Link href="/feedback">
                            <a>
                                <Button className={`${c.header__button} ${c.header__button_quest}`} type="blue">
                                    Заполнить заявку
                                </Button>
                            </a>
                        </Link>
                        <Button className={`${c.header__button} ${c.header__button_auth}`} type="blue" onClick={() => setModal(true)}>
                            Вход / Регистрация
                        </Button>
                    </div>
                </div>
            </div>
        </header>
            </>
    );
}

export default Header;