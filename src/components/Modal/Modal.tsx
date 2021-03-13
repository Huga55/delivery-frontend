import React, {ReactElement, useEffect, useState} from "react";
import AuthModal from "./AuthModal/AuthModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import ThankModal from "./ThankModal/ThankModal";
import RecordModal from "./RecordModal/RecordModal";
import AppendModal from "./AppendModal/AppendModal";
import { useDispatch } from "react-redux";
import {setAddressForChangeAction} from "../../../redux/reducers/book-reducer";

export type ModalTypes = "auth" | "register" | "thank" | "record" | "append" | ""

type PropsType = {
    type: ModalTypes
    setModal: (modalState: boolean) => void
}

const Modal: React.FC<PropsType> = (props) => {
    const [modalType, setModalType] = useState(props.type);
    const [classActive, setClassActive] = useState(false);

    const dispatch = useDispatch();
    //document.body.style.overflow = "hidden";

    let modalActive: string | ReactElement;
    let modalWindowClass = "";

    useEffect(() => {
        if (modalType === "") {
            setClassActive(false);
        }
    }, []);

    //for animation of show modal
    useEffect(() => {
        if(modalWindowClass) {
            setTimeout(setActiveClass, 10);
        }
    }, [modalWindowClass])

    const setActiveClass = () => {
        setClassActive(true);
    }

    //for animation of all modals, add class active
    const changeClass = () => {
        setClassActive(false);
        setTimeout(closeModal, 500);
    }

    const closeModal = () => {
        props.setModal(false);//close modal with use state from outside
        setModalType("");//clear type modal
        dispatch(setAddressForChangeAction(0));//off change of address in append modal
        document.body.style.overflow = "visible";
    }

    const getCurrentModal = () => {
        switch (modalType) {
            case "auth":
                modalActive = <AuthModal setModalType={setModalType} />
                modalWindowClass = "modal__window_standart";
                break;
            case "register":
                modalActive = <RegisterModal setModalType={setModalType} />
                modalWindowClass = "modal__window_standart";
                break;
            case "thank":
                modalActive = <ThankModal setModalType={setModalType} closeModal={changeClass}/>
                modalWindowClass = "modal__window_standart";
                break;
            case "record":
                modalActive = <RecordModal setModalType={setModalType} closeModal={changeClass}/>
                modalWindowClass = "modal__window_big";
                break;
            case "append":
                modalActive = <AppendModal setModalType={(type) => setModalType(type)} closeModal={changeClass}/>
                modalWindowClass = "modal__window_big";
                break;
            default:
                modalActive = ""
        }
    }
    getCurrentModal();


    return(
        <div className={classActive? "modal modal_active" : "modal"}>
            <div className={classActive? "modal__bg modal__bg_active" : "modal__bg"} onClick={changeClass}/>
            <div className={classActive? `modal__window modal__window_active ${modalWindowClass}` : `modal__window ${modalWindowClass}`}>
                <img src="/static/img/modal/close.svg" alt="" className="modal__close" onClick={changeClass} />
                {modalActive}
            </div>
        </div>
    );
}

export default Modal;