import React, {Dispatch, SetStateAction} from "react";
import Button from "../../common/Button/Button";
import c from "./ThankModal.module.css";
import {ModalTypes} from "../Modal";

type PropsType = {
    setModalType: Dispatch<SetStateAction<ModalTypes>>
    closeModal: () => void
}

const ThankModal: React.FC<PropsType> = (props) => {
    const { closeModal, setModalType } = props;

    const closeModalWindow = () => {
        closeModal();
    }

    return(
        <div className={c.thank}>
            <div className={c.thank__top + " modal__top"}>
                <h2 className={c.thank__title + " modal__title title-3"}>
                    Спасибо за заявку
                </h2>
            </div>
            <div className={c.thank__content + " modal__content"}>
                <div className={c.thank__left}>
                    <div className={c.thank__text + " text"}>
                        Ваша заявка принята. В ближайшее время наш менеджер свяжется с Вами для уточнения деталей
                    </div>
                    <Button type="green" className={`${c.thank__button} ${c.thank__button_desktop}`} onClick={closeModalWindow}>
                        Вернуться на сайт
                    </Button>
                </div>
                <div className={c.thank__right}>
                    <img src="/static/img/modal/img.png" alt="" className={c.thank__img} />
                </div>
                <Button type="green" className={`${c.thank__button} ${c.thank__button_mobile}`} onClick={closeModalWindow}>
                    Вернуться на сайт
                </Button>
            </div>
        </div>
    );
}

export default ThankModal;