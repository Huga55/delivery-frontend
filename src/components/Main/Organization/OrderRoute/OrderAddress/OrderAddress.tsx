import c from "./OrderAddress.module.css";
import Label from "../../../../common/Label/Lable";
import Input from "../../../../common/Input/Input";
import Map from "../../../../Map/Map";
import {OrderSectionPropsType} from "../OrderRoute";
import {getValidateProps} from "../../../../utils/validate/validate";
import {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Agree from "../../../../common/Agree/Agree";
import {AppStateType} from "../../../../../../redux/reducers";
import {LastAddressesType, setAddressFromMainPageAction} from "../../../../../../redux/reducers/form-reducer";

type PropsType = {
    direction: "dispatch" | "delivery"
}

const OrderAddress: React.FC<PropsType & OrderSectionPropsType> = (props) => {
    const [inputValue, setInputValue] = useState("");
    const [last1, setLast1] = useState(false);
    const [last2, setLast2] = useState(false);

    const { direction } = props;

    const { register, errors, setValue } = useFormContext();

    const dispatch = useDispatch();

    const addressesFromMainPage = useSelector((state: AppStateType) => state.form.addressesFromMainPage);

    const lastAddresses: LastAddressesType = useSelector((state: AppStateType) => state.form.lastAddresses);

    const isDispatch = direction === "dispatch";

    const setOldAddress = (e, address, index) => {
        e.preventDefault();
        setValue(`address-${direction}`, address);
        if(index === 1) {
            setLast1(true);
            setLast2(false);
        }else {
            setLast1(false);
            setLast2(true);
        }
    }

    useEffect(() => {
        if(addressesFromMainPage.addressDispatch && direction === "dispatch") {
            setValue("address-dispatch", addressesFromMainPage.addressDispatch);
        }
        if(addressesFromMainPage.addressDelivery && direction === "delivery") {
            setValue("address-delivery", addressesFromMainPage.addressDelivery);
        }
        dispatch(setAddressFromMainPageAction(null, null));
    }, [])

    return(
        <div className={isDispatch? c.route__dispatch: c.route__delivery}>
            <label className="organization__label">
                {isDispatch? "Откуда:" : "Куда:"}
            </label>
            <div className="organization__row row-dispatch">
                <Label className={`row__label-input label_${direction}`}>
                    <span className={c.route__prompt + " text"}>г. Москва, ул. 1-я Тверская-Ямская, д. 27</span>
                    <Input className={`${c.route__input} organization__input organization__input_${direction}`}
                           name={`address-${direction}`} type="address" placeholder="Адрес доставки" error={true}
                           autoComplete="off"
                           register={register} errorData={errors}
                           validateProps={getValidateProps({standart: ["required"], custom: []})}
                           inputValue={inputValue? inputValue : ""}/>
                </Label>
                <Map direction={direction}/>
            </div>
            <label className="organization__label-small">
                Недавние адреса:
            </label>
            {
                lastAddresses && (direction === "dispatch" || direction === "delivery")?
                        lastAddresses.map((address, index) => {
                            return(
                                index === 1 && ( (direction === "dispatch" && lastAddresses[0].addressDispatch === lastAddresses[1].addressDispatch) ||
                                    (direction === "delivery" && lastAddresses[0].addressDelivery === lastAddresses[1].addressDelivery) )? "" :
                                <div className={`${c.route__last} organization__last last last_${direction}`}
                                     onClick={(e) => setOldAddress(e, direction === "dispatch"? address.addressDispatch : address.addressDelivery, 1)}>
                                    <div className="last__text">
                                        {direction === "dispatch"? address.addressDispatch : address.addressDelivery}
                                    </div>
                                    <a href="#" className="last__link link link_green">
                                        Выбрать
                                    </a>
                                    <Agree className="last-checkbox" prefixId="addressLast-1" setIsAgree={setLast1} value={last1}/>
                                </div>
                            );
                        }) : ""
            }
        </div>
    );
}

export default OrderAddress;