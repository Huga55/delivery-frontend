import LayoutMain from "../components/layouts/LayoutMain";
import Top from "../components/Main/Top/Top";
import Organization from "../components/Main/Organization/Organization";

const Order = () => {
    return(
        <LayoutMain>
            <Top thisPage="Оформление доставки" />
            <Organization />
        </LayoutMain>
    );
}

export default Order;