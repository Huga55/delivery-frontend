import c from "./OrderRoute.module.css";
import OrderAddress from "./OrderAddress/OrderAddress";

export type OrderSectionPropsType = any

const OrderRoute: React.FC<OrderSectionPropsType> = (props) => {
    return(
        <div className={c.route + " organization__block"}>
            <div className={c.route__left + " organization__left"}>
                <img src="/static/img/organization/route.svg" alt="" className="organization__img" />
            </div>
            <div className={c.route__right + " organization__right"}>
                <div className="organization__subtitle title-4">
                    Маршрут
                </div>
                <OrderAddress direction="dispatch" />
                <OrderAddress direction="delivery" />
            </div>
        </div>
    );
}

export default OrderRoute;