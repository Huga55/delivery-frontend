import c from "./OrderPerson.module.css";
import {useState} from "react";
import OrderPersonName from "./OrderPersonName/OrderPersonName";
import {useFormContext} from "react-hook-form";
import Agree from "../../../../common/Agree/Agree";
import {AppStateType} from "../../../../../../redux/reducers";
import {LastContactsType} from "../../../../../../redux/reducers/form-reducer";
import { useSelector } from "react-redux";

type PropsType = {
    type: "dispatch" | "delivery"
}

const OrderPerson: React.FC<PropsType> = (props) => {
    const [namesCount, setNamesCount] = useState(1);
    const [last1, setLast1] = useState(false);
    const [last2, setLast2] = useState(false);

    const { setValue } = useFormContext();

    const lastContacts: LastContactsType = useSelector((state: AppStateType) => state.form.lastContacts);

    const { type } = props;

    const isDispatch = type === "dispatch";

    let persons = [];

    for(let i = 0; i < namesCount; i++) {
        if(i === 0) {
            persons.push(<OrderPersonName type={type} key={i} index={i} />);
        }else {
            persons.push(<OrderPersonName type={type} key={i} index={i} count={namesCount} setCount={setNamesCount}/>);
        }
    }

    const addOldValue = (name, phone, index) => {
        setValue(`name-${type}-0`, name);
        setValue(`0-phone-${type}-0`, phone);
        if(index === 1) {
            setLast1(true);
            setLast2(false);
        }else {
            setLast1(false);
            setLast2(true);
        }
    }

    return(
        <div className={isDispatch? c.man__dispatch : c.man__delivery} >
            {persons}
            <label className="organization__label-small">
                Недавние адресты:
            </label>
            {
                lastContacts && (type === "dispatch" || type === "delivery")?
                    lastContacts.map((contact, index) => {
                        return(
                            index === 1 && (
                                (type === "dispatch" && lastContacts[0].contactDispatch.name === lastContacts[1].contactDispatch.name && lastContacts[0].contactDispatch.phone === lastContacts[1].contactDispatch.phone) ||
                            (type === "delivery" && lastContacts[0].contactDelivery.name === lastContacts[1].contactDelivery.name && lastContacts[0].contactDelivery.phone === lastContacts[1].contactDelivery.phone) )? "" :
                            <div className={`organization__last last last_${type}-man`} onClick={() =>
                                addOldValue(type === "dispatch"? contact.contactDispatch.name : contact.contactDelivery.name,
                                    type === "dispatch"? contact.contactDispatch.phone : contact.contactDelivery.phone, index + 1)}>
                                <div className="last__text">
                                    {type === "dispatch"? contact.contactDispatch.name : contact.contactDelivery.name}
                                </div>
                                <div className="last__phone">
                                    {type === "dispatch"? contact.contactDispatch.phone : contact.contactDelivery.phone}
                                </div>
                                <div className="last__link link link_green" >
                                    Выбрать
                                </div>
                                <Agree className="last-checkbox" prefixId={"manLast-" + index} setIsAgree={setLast1} value={last1}/>
                            </div>
                        )
                    }) : ""
            }
            <div className={c.man__add + " link link_green"}
                 onClick={() => setNamesCount(namesCount + 1)}>+ Добавить {isDispatch? "отправителя" : "получателя"}</div>
        </div>
    );
}

export default OrderPerson;