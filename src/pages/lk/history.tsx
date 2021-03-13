import LayoutLk from "../../components/layouts/LayoutLk";
import Select from "../../components/common/Select/Select";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllOrders,
    setCountNeedOrderAction,
    setCurrentPageOrderAction, setSearchValueAction, setUsualFiltersAction
} from "../../../redux/reducers/actualOrder-reducer";
import Order from "../../components/LK/Order/Order";
import Manage from "../../components/common/Manage/Manage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../components/common/Calendar/Calendar";
import Modal from "../../components/Modal/Modal";


const History = () => {
    const [modalIsActive, setModalIsActive] = useState(false);
    const [countNeedOfSelect, setCountNeedOfSelect] = useState("5");//count of records for watch
    const [dropValueOfSelects, setDropValueOfSelects] = useState(false);//to drop selects value after click by button "drop"
    const [isShowFilters, setIsShowFilters] = useState(false);//for mobile, to show / to hide filters
    const [dateStartFilterSelect, setDateStartFilterSelect] = useState(null);
    const [dateFinishFilterSelect, setDateFinishFilterSelect] = useState(null);
    const [priceFilterSelect, setPriceFilterSelect] = useState("asc");
    const [statusFilterSelect, setStatusFilterSelect] = useState(null);
    const [isSelectDate, setIsSelectDate] = useState(false);//for select date on calendar(datepicker)

    const [isInitialPage, setIsInitialPage] = useState(true);

    //only for date picker!!!
    const [startDatePicker, setStartDatePicker] = useState(null);
    const [finishDatePicker, setFinishDatePicker] = useState(null);

    const dispatch = useDispatch();

    const filters = useSelector(state => state.actualOrder.filters)
    const { bySearch } = filters;

    const { orders, countOrders, countNeed, currentPage } = useSelector(state => state.actualOrder);
    const [currentPageOfManage, setCurrentPageOfManage] = useState(currentPage);

    const countPages = Math.ceil(countOrders / countNeed);

    useEffect( () => {
        setDateStartFilterSelect(getStandartDate(new Date()));
        setDateFinishFilterSelect(getStandartDate(new Date()));
        setInitialPage();
    }, [])

    const setInitialPage = async () => {
        const data = {
            countNeed: countNeed,
            currentPage: currentPage,
            dateStart: filters.dateStart,
            dateFinish: filters.dateFinish,
            statusFilter: filters.byStatus,
            priceFilter: filters.byPrice,
            searchFilter: filters.bySearch,
        }
        await dispatch(getAllOrders(data));
        await setIsInitialPage(false);
    }

    useEffect(() => {
        const usualFilters = {
            dateStart: null,
            dateFinish: null,
            statusFilter: null,
            priceFilter: null,
        }
        const data = {
            countNeed: countNeed,
            currentPage: +currentPageOfManage,
            ...usualFilters,
            searchFilter: bySearch,
        }
        dispatch(setCurrentPageOrderAction(currentPageOfManage));
        //if it is initial of this page
        if(isInitialPage) {
            return;
        }
        dispatch(getAllOrders(data));
        dispatch(setUsualFiltersAction(usualFilters));
    }, [currentPageOfManage]);

    useEffect(() => {
        const usualFilters = {
            dateStart: null,
            dateFinish: null,
            statusFilter: null,
            priceFilter: null,
        }
        dispatch(setCountNeedOrderAction(countNeedOfSelect));
        dispatch(setCurrentPageOrderAction(1));
        setDropValueOfSelects(true);
        //if it is initial of this page
        if(isInitialPage) {
            return;
        }
        dispatch(getAllOrders({
            countNeed: +countNeedOfSelect,
            currentPage: 1,
            ...usualFilters,
            searchFilter: bySearch,
        }));
        dispatch(setUsualFiltersAction(usualFilters));
    }, [countNeedOfSelect])

    const useFilters = () => {
        const usualFilters = {
            dateStart: getDateFormatForServer(dateStartFilterSelect),
            dateFinish: getDateFormatForServer(dateFinishFilterSelect),
            priceFilter: priceFilterSelect,
            statusFilter: statusFilterSelect,
        }
        dispatch(setUsualFiltersAction(usualFilters));
        dispatch(getAllOrders({
            countNeed: countNeed,
            currentPage: +currentPageOfManage,
            ...usualFilters,
            searchFilter: bySearch,
        }));
    };

    const getDateFormatForServer = (date) => {
        return date ? date.split('.').reverse().join('-') : null;
    };

    const dropFilters = () => {
        setDropValueOfSelects(true);

        //clear date filter
        setStartDatePicker(null);
        setFinishDatePicker(null);
        setDateStartFilterSelect(null);
        setDateFinishFilterSelect(null);

        const usualFilters = {
            dateFinish: null,
            dateStart: null,
            priceFilter: null,
            statusFilter: null,
        }
        //clear filters in redux
        dispatch(setUsualFiltersAction(usualFilters));
        dispatch(setSearchValueAction(null));

        dispatch(getAllOrders({
            countNeed: +countNeedOfSelect,
            currentPage: 1,
            ...usualFilters,
            searchFilter: null,
        }));
    }

    const changeDate = dates => {
        const [start, end] = dates;
        setStartDatePicker(start);
        setFinishDatePicker(end);

        setDateStartFilterSelect(getStandartDate(start));
        setDateFinishFilterSelect(getStandartDate(end));
    };

    const getStandartDate = (date) => {
        if (!date) {
            return null;
        }
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return setZero(day) + setZero(month) + year;
    }

    const setZero = (number) => {
        if (+number < 10) {
            return "0" + number + ".";
        }
        return number + ".";
    }

    const getWordCorrect = (count) => {
        const endNumb = count.toString().slice(-1);

        switch (endNumb) {
            case "1":
                return "заказ"
            case "2":
            case "3":
            case "4":
                return "заказа"
            default:
                return "заказов"
        }
    }

    const hideCalendar = (e) => {
        const targetClass = e.relatedTarget ? e.relatedTarget.parentElement.className : "";
        if (targetClass === "react-datepicker__week") {
            e.preventDefault();
        } else {
            setIsSelectDate(false);
        }
    }

    return (
        <LayoutLk currentLink="/history">
            {modalIsActive ? <Modal type="record" setModal={setModalIsActive}/> : ""}
            <div className="actual">
                <div className="lk-top">
                    <div className="actual__left">
                        <h2 className="actual__title title-2">
                            История заказов
                        </h2>
                        <div className="actual__posttitle">
                            {orders ? orders.length : 0} {getWordCorrect(orders ? orders.length : "0")}
                        </div>
                    </div>

                    <div className="actual__right">
                        <Select title="5" optionsText={["5", "10", "15"]} classNameGeneral="lk-select_pages"
                                classNameTitle="lk__select-top_pages actual__select-top"
                                classNameOption="lk__option" setOption={setCountNeedOfSelect}
                                variables={["5", "10", "15"]}/>
                    </div>
                </div>
                <div className="actual__window lk__window">
                    <div className="lk-window__top" onClick={() => setIsShowFilters(!isShowFilters)}>
                        <div className="lk-window__top-text">Сортировать</div>
                        <div className="lk-window__top-icon"/>
                    </div>
                    <div
                        className={isShowFilters ? "actual__window-content window-content window-content_active" : "actual__window-content window-content"}>
                        <div
                            className={isSelectDate ? "actual__date-window actual__date-window_active" : "actual__date-window"}
                            tabIndex={0}
                            onBlur={hideCalendar}
                            onMouseDown={() => setIsSelectDate(!isSelectDate)}>
                            <div className="actual__date actual__date_from">
                                <Calendar className="info__calendar"/>
                                {dateStartFilterSelect ? dateStartFilterSelect : getStandartDate(new Date())}
                            </div>
                            -
                            <div className="actual__date actual__date_to">
                                <Calendar className="info__calendar"/>
                                {dateFinishFilterSelect ? dateFinishFilterSelect : getStandartDate(new Date())}
                            </div>
                            <div className={isSelectDate ? "actual__datepicker" : "actual__datepicker none"}
                                 onMouseDown={(e) => e.stopPropagation()}>
                                <DatePicker
                                    selected={startDatePicker}
                                    onChange={changeDate}
                                    startDate={startDatePicker}
                                    endDate={finishDatePicker}
                                    selectsRange
                                    inline
                                />
                            </div>
                        </div>
                        <Select title="Статус"
                                optionsText={["Ожидает подтверждения", "Подтвержден", "В процессе", "Завершен"]}
                                classNameGeneral="actual__status"
                                classNameTitle="actual__select-top" classNameOption="actual__status-option"
                                variables={["new", "available", "active", "completed"]} dropValue={dropValueOfSelects}
                                setDropValue={setDropValueOfSelects}
                                setOption={setStatusFilterSelect}/>

                        <Select optionsText={["Дешевле", "Дороже", "Без фильтра"]} classNameGeneral="actual__price"
                                classNameTitle="" classNameOption="actual__price-option"
                                variables={["asc", "desc", null]}
                                setDropValue={setDropValueOfSelects} dropValue={dropValueOfSelects}
                                setOption={setPriceFilterSelect}/>

                        <div className="actual__buttons">
                            <button className="actual__button actual__button-accept btn btn_green" onClick={useFilters}>
                                Показать
                            </button>
                            <button className="actual__button actual__button-clear btn btn_blue" onClick={dropFilters}>
                                Сбросить
                            </button>
                        </div>
                    </div>
                </div>
                {
                    orders && orders.length > 0 ?
                        <div className="actual__carts">
                            {orders.map((o, index) => <Order orderData={o} key={index} setModal={setModalIsActive}/>)}
                        </div> : ""
                }

                <Manage countPages={countPages} currentPage={currentPage}
                        setCurrentPage={(page) => setCurrentPageOfManage(page)}/>
            </div>
        </LayoutLk>
    );
}

export default History;