import c from "./OrderMan.module.css";
import Label from "../../../common/Label/Lable";
import Input from "../../../common/Input/Input";
import {OrderSectionPropsType} from "../OrderRoute/OrderRoute";
import OrderPerson from "./OrderPerson/OrderPerson";

const OrderMan: React.FC<OrderSectionPropsType> = (props) => {
    return(
        <div className={c.man + " organization__block"}>
            <div className={c.main__left + " organization__left"}>
                <img src="/static/img/organization/man.svg" alt="" className="organization__img" />
            </div>
            <div className={c.man__right + " organization__right"}>
                <div className="organization__subtitle title-4">
                    Контактные данные
                </div>
                <OrderPerson type="dispatch" />
                <OrderPerson type="delivery" />
            </div>
        </div>
    );
}

export default OrderMan;