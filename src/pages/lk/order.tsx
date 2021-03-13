import LayoutLk from "../../components/layouts/LayoutLk";
import Organization from "../../components/Main/Organization/Organization";


const LkOrder = () => {
    return (
        <LayoutLk currentLink="/order">
            <div className="calculation">
                <h2 className="calculation__title title-2">
                    Расчеты
                </h2>
                <div className="calculation__content">
                    <Organization isLk={true}/>
                </div>
            </div>
        </LayoutLk>
    );
}

export default LkOrder;