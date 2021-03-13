import {
    getAllOrders,
    OrdersType,
    repeatOrder,
    setIdCurrentOrderAction
} from "../../../../redux/reducers/actualOrder-reducer";
import {Dispatch, SetStateAction, useState} from "react";
import OrderDoc from "./OrderDoc";
import Repeat from "./Repeat";
import { useDispatch, useSelector } from "react-redux";

type PropsType = {
    orderData: OrdersType
    setModal: Dispatch<SetStateAction<boolean>>
}

export const statuses = {
    new: {name: "Ожидает подтверждения", class: "info-status"},
    available: {name: "Подтвержден", class: "info-status_accept"},
    active: {name: "В процессе", class: "info-status_process"},
    completed: {name: "Завершен", class: "info-status_complete"},
    canceled: {name: "Отменен", class: "info-status_complete"},
}

const Order: React.FC<PropsType> = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const { orderData, setModal } = props;

    const dispatch = useDispatch();

    const { countNeed, currentPage, filters } = useSelector(state => state.actualOrder);
    const { dateStart, dateFinish, byStatus, byPrice, bySearch } = filters;

    const showDocsOfOrder = async (orderId) => {
        await dispatch(setIdCurrentOrderAction(orderId));
        setModal(true);
    }

    const repeatThisOrder = async () => {
        await dispatch(repeatOrder(orderData.id));
        await dispatch(getAllOrders({countNeed, currentPage,
            dateStart: dateStart,
            dateFinish: dateFinish,
            statusFilter: byStatus,
            priceFilter: byPrice,
            searchFilter: bySearch,
        }));
    }

    return(
        <div className="actual__cart">
            <div className="actual__cart-content">
                <div className="actual__cart-left">
                    <div className="actual__left-top">
                        <div className="actual__id text">
                            №{orderData.idDostavista}
                        </div>
                        <div className="actual__date text">
                            {orderData.dateCreate}
                        </div>
                    </div>
                    <div className="actual__name title-4">
                        {orderData.nameCargo}
                    </div>
                    <div className="actual__cart-bottom">
                        <span className="actual__type text">
                            {orderData.type === "cargo"? "(груз)" : "(документы)"}
                        </span>
                        <div className="actual__doc actual_repeat_mobile">
                            <Repeat />
                            <div className="actual__doc-text" onClick={repeatThisOrder}>
                                Повтор заказа
                            </div>
                        </div>
                        <span className="actual__manage" onClick={() => setIsOpen(!isOpen)}>
                                    {isOpen? "Свернуть" : "Подробнее" }
                        </span>
                    </div>
                </div>
                <div className={isOpen? "actual__cart-right actual__cart-right_active" : "actual__cart-right"}>
                    <div className="actual__address">
                        <div className="actual__address-title text">
                            Адресат
                        </div>
                        <div className="actual__address-name text">
                            {orderData.nameOrganization? orderData.nameOrganization : "Не указан"}
                        </div>
                    </div>
                    <div className="actual__provider">
                        <div className="actual__provider-title text">
                            Поставщик
                        </div>
                        <div className="actual__provider-name text">
                            {orderData.nameDelivery}
                        </div>
                        <div className="actual__provider-title text">
                            Трек-номер
                        </div>
                        <div className="actual__provider-number text">
                            {orderData.trackNumber? orderData.trackNumber : "Отсутсвует"}
                        </div>
                    </div>
                    <div className="actual__info">
                        <div className="actual__price-title text">
                            Стоимость
                        </div>
                        <div className="actual__price-numb text">
                            {orderData.price} ₽
                        </div>
                        <div className="actual__status-title text">
                            Статус заказа
                        </div>
                        <div className={`actual__info-status ${orderData.status? statuses[orderData.status].class : "info-status"} text`}>
                            {orderData.status? statuses[orderData.status].name : "С заказом что-то не то"}
                        </div>
                    </div>
                    <div className="actual__btns-table">
                        <div className="actual__doc actual__doc_desktop" onClick={() => showDocsOfOrder(orderData.id)}>
                            <OrderDoc />
                            <div className="actual__doc-text">
                                Документы
                            </div>
                        </div>
                        <div className="actual__doc actual__doc_desktop actual__doc_mobile-repeat">
                            <Repeat />
                            <div className="actual__doc-text" onClick={repeatThisOrder}>
                                Повтор заказа
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="actual__doc actual__doc_mobile" onClick={() => showDocsOfOrder(orderData.id)}>
                <OrderDoc />
                <div className="actual__doc-text">
                    Документы
                </div>
            </div>
        </div>
    );
}

export default Order;