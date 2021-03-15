import OrderRoute from "./OrderRoute/OrderRoute";
import OrderMan from "./OrderMan/OrderMan";
import OrderType from "./OrderType/OrderType";
import OrderTime from "./OrderTime/OrderTime";
import OrderPayment from "./OrderPayment/OrderPayment";
import {FormProvider, useForm} from "react-hook-form";
import Agree from "../../common/Agree/Agree";
import OrderVal from "./OrderVal/OrderVal";
import {useSelector, useDispatch} from "react-redux";
import {
    changePriceAction,
    getCorrectAddress, getCorrectAddressAction,
    sendDataDeliveryToServer,
    setIdActiveAddressAction
} from "../../../../redux/reducers/form-reducer";
import Modal from "../../Modal/Modal";
import {useEffect, useState} from "react";

type PropsType = {
    isLk?: boolean
}

const Organization: React.FC<PropsType> = (props) => {
    const [isAgree, setIsAgree] = useState(true);
    const [isInterval, setIsInterval] = useState(false);
    const [intervalId, setIntervalId] = useState("");

    //to use address from book
    const { price, idAddressActive } = useSelector(state => state.form);
    const addressData = useSelector(state => state.book.addresses)?.find((a) => a.id_address === idAddressActive);

    const methods = useForm({
        shouldFocusError: false,
        defaultValues: {
            "name-delivery-0": idAddressActive? addressData.name : "",
            "0-phone-delivery-0": idAddressActive? addressData.phone_mobile : "",
            "address-delivery": idAddressActive? addressData.address : "",
        }
    });

    const [modalIsActive, setModalIsActive] = useState(false);

    const { handleSubmit } = methods;

    const idUser = useSelector(state => state.user.id);

    const dispatch = useDispatch();

    const { isLk } = props;

    useEffect(() => {
        if(idAddressActive !== null) {
            dispatch(setIdActiveAddressAction(null));
        }
    }, [])

    const sendForm = async (data) => {
        console.log("data", data);

        //if date delivery < date diapstch, then error
        const dateDispatch = data["date-dispatch"].split(".").reverse().join("-");
        const dateDelivery = data["date-delivery"].split(".").reverse().join("-");
        if( new Date(dateDispatch) > new Date(dateDelivery) ) {
            methods.setError("date-dispatch", {type: "manual", message: "Некорректные даты"});
            methods.setError("date-delivery", {type: "manual", message: "Некорректные даты"});
            return;
        }
        let dateNightDispatch = dateDispatch.split("-");
        if( new Date() > new Date(dateNightDispatch[0], dateNightDispatch[1], dateNightDispatch[2], 23, 59, 59) ) {
            console.log(dateDispatch);
            methods.setError("date-dispatch", {type: "manual", message: "Некорректная дата"});
            return;
        }

        // const timeFromDispatch = data.time_from_dispatch;
        // const timeToDispatch = data.time_to_dispatch;
        // const timeFromDelivery = data.time_from_delivery;
        // const timeToDelivery = data.time_to_delivery;

        // if( new Date(dateDispatch) === new Date(dateDelivery) ) {
        //     if( (timeFromDelivery.split(":")[0] - timeFromDispatch.split(":")[0]) < 2 ) {
        //         methods.setError("time_from_dispatch", {type: "manual", message: "Минимаьная разница 2 часа"});
        //         methods.setError("time_from_delivery", {type: "manual", message: "Минимаьная разница 2 часа"});
        //         return;
        //     }
        // }

        // if(timeFromDispatch.split(":")[0] < timeToDispatch.split(":")[0]) {
        //     methods.setError("time_from_dispatch", {type: "manual", message: "Ошибка"});
        //     methods.setError("time_to_dispatch", {type: "manual", message: "Ошибка"});
        //     return;
        // }
        // if(timeFromDelivery.split(":")[0] < timeToDelivery.split(":")[0]) {
        //     methods.setError("time_from_delivery", {type: "manual", message: "Ошибка"});
        //     methods.setError("time_to_delivery", {type: "manual", message: "Ошибка"});
        //     return;
        // }

        const dateDispatchArr = dateDispatch.split("-");
        const fullDateDispatch = new Date(dateDispatchArr[0], dateDispatchArr[1], dateDispatchArr[2]);

        dispatch(getCorrectAddress(data["address-delivery"], "address-delivery"));

        data.dispatchData = getArrOfNamesPhones(data, "dispatch");
        data.deliveryData = getArrOfNamesPhones(data, "delivery");
        const dataSend = {
            id: idUser,
            dispatchData: data.dispatchData,
            deliveryData: data.deliveryData,
            address_delivery: data["address-delivery"],
            address_dispatch: data["address-dispatch"],
            cargo_type: data["cargo-type"],
            date_dispatch: data["date-dispatch"],
            date_delivery: data["date-delivery"],
            payment: data.payment,
            val: data.val,
            size_cancel: data["size-cancel"],
            size_exact: data["size-exact"],
            weight: data.weight,
            type_height: data["type-height"],
            type_length: data["type-length"],
            type_width: data["type-width"],
            name_cargo: data["name_cargo"],
            // time: {
            //   dispatch_from: data.time_from_dispatch,
            //   dispatch_to: data.time_to_dispatch,
            //   delivery_from: data.time_from_delivery,
            //   delivery_to: data.time_to_delivery,
            // },
        }
        await dispatch(sendDataDeliveryToServer(dataSend));
        setModalIsActive(true);
        for(let name in data) {
            methods.setValue(name, "");
            dispatch(changePriceAction(0));
            dispatch(getCorrectAddressAction(null, null));
        }
    }


    const getArrOfNamesPhones = (data, type) => {
        const keys = Object.keys(data);
        let newData = {};

        const countNameDispatch = keys.filter((k) => k.indexOf("name-" + type) >= 0).length;

        newData["names"] = [];
        newData["phones"] = {};
        for (let i = 0; i < countNameDispatch; i++) {
            newData["names"][i] = data["name-" + type + "-" + i];
            const countPhoneDispatch = keys.filter((k) => k.indexOf(i + "-phone-" + type) >= 0).length;
            newData["phones"][i] = [];
            for (let j = 0; j < countPhoneDispatch; j++) {
                newData["phones"][i][j] = data[i + "-phone-" + type + "-" + j];
            }
        }

        return newData;
    }

    return (
        <>
            {modalIsActive? <Modal type="thank" setModal={setModalIsActive} /> : ""}
            <section className={isLk? "organization calculation__organization" : "organization"}>
                <div className={isLk? "calculation__line organization__line" : "organization__line"} />
                <div className={isLk? "calculation__container container" : "organization__container container"}>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(sendForm)}>
                            <OrderRoute/>
                            <OrderMan/>
                            <OrderType/>
                            <OrderTime/>
                            <OrderVal/>
                            <OrderPayment/>
                            <div className="organization__bottom">
                                <div className="organization__window">
                                    <div className="organization__window-title text">
                                        Итого:
                                    </div>
                                    <div className="organization__result title-2">
                                        {price? price : 0} ₽
                                    </div>
                                    <div className="organization__subscribe">
                                        Расчет является предварительным, итоговая стоимость может отличаться от
                                        указанной и
                                        определяется при обработке пересылаемого отправления сотрудниками Еxpress2you
                                    </div>
                                </div>
                                <div className="organization__bg">
                                    <Agree className="organization__label-checkbox" prefixId="organization" setIsAgree={setIsAgree}>
                                        Согласен(-на) на обработку персональных данных согласно политике
                                        конфиденциальности
                                    </Agree>
                                    <button className="organization__button btn btn_green" disabled={!isAgree}>
                                        Отправить заявку
                                    </button>
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </section>
        </>
    );
}

export default Organization;