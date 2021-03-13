import c from "./OrderPayment.module.css";
import Radios from "../../../common/Radios/Radios";
import {useFormContext} from "react-hook-form";

const OrderPayment: React.FC = () => {
    const { register } = useFormContext();

    return(
        <div className={c.payment + " organization__block"}>
            <div className={c.payment__left + " organization__left"}>
                <img src="/static/img/organization/payment.svg" alt="" className="organization__img" />
            </div>
            <div className={c.payment__right + " organization__right"}>
                <div className="organization__subtitle title-4">
                    способ оплаты
                </div>
                <label className="organization__label">
                    Выберите способ оплаты:
                </label>
                <Radios className={c.payment__radios} name="payment" inputs={[
                    {beforeId: "payment", afterId: "cart", value: "bank_card", html: "Картой онлайн", classNameLabel: c.payment__radio, register},
                    {beforeId: "payment", afterId: "transfer", value: "non_cash", html: "Б/н перевод", classNameLabel: c.payment__radio, register},
                ]} />
            </div>
        </div>
    );
}

export default OrderPayment;