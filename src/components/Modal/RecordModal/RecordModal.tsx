import React, {Dispatch, SetStateAction, useEffect} from "react";
import c from "./RecordModal.module.css";
import {ModalTypes} from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import {statuses} from "../../LK/Order/Order";
import {DocsType, getDocsOfOrder} from "../../../../redux/reducers/actualOrder-reducer";

type PropsType = {
    setModalType: Dispatch<SetStateAction<ModalTypes>>
    closeModal: () => void
}

const RecordModal: React.FC<PropsType> = (props) => {
    const { closeModal, setModalType } = props;

    const dispatch = useDispatch();

    const orderId = useSelector(state => state.actualOrder.idCurrentOrder);
    const orderData = useSelector(state => state.actualOrder.orders).find((o) => o.id === orderId);

    useEffect(() => {
        dispatch(getDocsOfOrder(orderData.idDostavista));
    }, [])

    const docs: Array<DocsType> | null = useSelector(state => state.actualOrder.docsOfOrder);

    return(
        <div className={c.record}>
            <div className={c.record__top + " modal__top"}>
                <h2 className={c.record__title + " modal__title title-3"}>
                    Документы
                </h2>
            </div>
            <div className={c.record__describe}>
                <div className={c["record__describe-left"]}>
                    <div className={c.record__date + " text"}>
                        {orderData.dateCreate}
                    </div>
                    <div className={c.record__name + " title-4"}>
                        {orderData.nameCargo}
                    </div>
                    <div className={c.record__type + " text"}>
                        {orderData.type === "cargo"? "(груз)" : "(документы)"}
                    </div>
                </div>
                <div className={c.record__describe__right}>
                    <div className={c.record__subname + " text"}>
                        Статус заказа
                    </div>
                    <div className={c.record__status + " info-status"}>
                        {orderData.status? statuses[orderData.status].name : "С заказом что-то не то"}
                    </div>
                </div>
            </div>
            <div className={c.record__content + " modal__content"}>
                <div className={c.record__window}>
                    <table className={c.record__table}>
                        <tr className={c.record__row}>
                            <th className={`${c["record__cell-head"]} ${c["record__cell-name"]}`}>
                                Название документа
                            </th>
                            <th className={`${c["record__cell-head"]} ${c["record__cell-type"]}`}>
                                Тип документа
                            </th>
                            <th className={`${c["record__cell-head"]} ${c["record__cell-number"]}`}>
                                Номер заказа
                            </th>
                            <th className={`${c["record__cell-head"]} ${c["record__cell-date"]}`}>
                                Дата поступления
                            </th>
                            <th className={`${c["record__cell-head"]} ${c["record__cell-download"]}`}>

                            </th>
                        </tr>
                        {docs? docs.map((d) => {
                            return(
                                <tr className={c.record__row}>
                                    <td className={`${c.record__cell} ${c["record__cell-name"]}`}>{d.name}</td>
                                    <td className={`${c.record__cell} ${c["record__cell-type"]}`}>{d.type_doc}</td>
                                    <td className={`${c.record__cell} ${c["record__cell-number"]}`}>№{d.dostavista_id}</td>
                                    <td className={`${c.record__cell} ${c["record__cell-date"]}`}>{d.created_at}</td>
                                    <td className={`${c.record__cell} ${c["record__cell-download"]}`}>
                                        <a className={c.record__button + " btn btn_blue"} href={d.path} target="_blank" download>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M1.67778 14.2222V14.3222H1.77778H13.5111H13.6111V14.2222V10.2756C13.6111 9.83301 13.9575 9.48668 14.4 9.48668C14.8426 9.48668 15.1889 9.83301 15.1889 10.2756V15.1111C15.1889 15.5537 14.8426 15.9 14.4 15.9H0.888889C0.44634 15.9 0.1 15.5537 0.1 15.1111V10.2756C0.1 9.83301 0.446339 9.48668 0.888889 9.48668C1.33144 9.48668 1.67778 9.83301 1.67778 10.2756V14.2222ZM7.07878 11.3109L7.07886 11.3108L7.07551 11.3074L3.50293 7.69927C3.2018 7.38152 3.20465 6.87664 3.51777 6.57918C3.83548 6.27736 4.34093 6.27996 4.63861 6.59331L4.6386 6.59332L4.63979 6.59453L6.66646 8.65677L6.83778 8.8311V8.58668V0.888889C6.83778 0.446339 7.18412 0.1 7.62667 0.1C8.06922 0.1 8.41556 0.44634 8.41556 0.888889V8.56888V8.8133L8.58688 8.63898L10.6129 6.57739C10.613 6.5773 10.6131 6.57721 10.6132 6.57712C10.9297 6.26089 11.4181 6.26066 11.7346 6.5605C12.0504 6.87719 12.0503 7.36546 11.7501 7.68182C11.75 7.68196 11.7499 7.68211 11.7497 7.68225L8.21373 11.3071C8.21359 11.3072 8.21346 11.3073 8.21332 11.3075C8.05417 11.4664 7.86632 11.5444 7.64444 11.5444C7.41915 11.5444 7.21685 11.4643 7.07878 11.3109Z"
                                                    fill="#2153DA" stroke="white" stroke-width="0.2"/>
                                            </svg>
                                            Скачать
                                        </a>
                                    </td>
                                </tr>
                            );
                        }) : ""}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RecordModal;