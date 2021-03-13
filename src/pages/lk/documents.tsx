import LayoutLk from "../../components/layouts/LayoutLk";
import Select from "../../components/common/Select/Select";
import Radios from "../../components/common/Radios/Radios";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Manage from "../../components/common/Manage/Manage";
import {
    changeTypeFilterAction,
    getAllRecords,
    setCountNeedRecordsAction,
    setCurrentPageRecordAction
} from "../../../redux/reducers/record-reducer";
import Calendar from "../../components/common/Calendar/Calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Documents = () => {
    const [countNeedOfSelect, setCountNeedOfSelect] = useState("10");//count of docs/records for watch
    const [dropValueOfSelects, setDropValueOfSelects] = useState(false);//to drop selects value after click by button "drop"
    const [isShowFilters, setIsShowFilters] = useState(false);//for mobile, to show / to hide filters
    const [dateStartFilterSelect, setDateStartFilterSelect] = useState(null);
    const [dateFinishFilterSelect, setDateFinishFilterSelect] = useState(null);
    const [docTypeFilter, setDocTypeFilter] = useState(null);
    const [typeFilter, setTypeFilter] = useState("doc");
    const [isSelectDate, setIsSelectDate] = useState(false);//for select date on calendar(datepicker)

    //only for date picker!!!
    const [startDatePicker, setStartDatePicker] = useState(null);
    const [finishDatePicker, setFinishDatePicker] = useState(null);

    const dispatch = useDispatch();

    const { docs, countRecords, currentPage, countNeed, filters } = useSelector(state => state.record);
    const [currentPageOfManage, setCurrentPageOfManage] = useState(currentPage);

    const countPages = Math.ceil(countRecords / countNeed);

    useEffect(() => {
        dispatch(getAllRecords({countNeed: +countNeedOfSelect, currentPage: currentPageOfManage, dateFinish: null, dateStart: null,
        doc_type: null, type: typeFilter}));
        setDateStartFilterSelect(getStandartDate(new Date()));
        setDateFinishFilterSelect(getStandartDate(new Date()));
    }, []);

    useEffect(() => {
        dispatch(changeTypeFilterAction(typeFilter));
    }, [typeFilter]);

    useEffect(() => {
        dispatch(setCountNeedRecordsAction(countNeedOfSelect));
        dispatch(setCurrentPageRecordAction(1));
        dispatch(getAllRecords({countNeed: +countNeedOfSelect, currentPage: 1, dateFinish: null, dateStart: null, doc_type: null, type: typeFilter}));
        setDropValueOfSelects(true);
    }, [countNeedOfSelect]);

    const useFilters = () => {
        dispatch(getAllRecords({countNeed: countNeed, currentPage: +currentPageOfManage,
            dateStart: getDateFormatForServer(dateStartFilterSelect),
            dateFinish: getDateFormatForServer(dateFinishFilterSelect), doc_type: docTypeFilter, type: typeFilter}));
    };

    const getDateFormatForServer = (date) => {
        return date? date.split('.').reverse().join('-') : null;
    };

    const dropFilters = () => {
        setDropValueOfSelects(true);

        //clear date filter
        setStartDatePicker(null);
        setFinishDatePicker(null);
        setDateStartFilterSelect(null);
        setDateFinishFilterSelect(null);

        dispatch(getAllRecords({countNeed: +countNeedOfSelect, currentPage: 1, dateFinish: null, dateStart: null, doc_type: null, type: typeFilter}));
    };

    const changeDate = dates => {
        const [start, end] = dates;
        setStartDatePicker(start);
        setFinishDatePicker(end);

        setDateStartFilterSelect(getStandartDate(start));
        setDateFinishFilterSelect(getStandartDate(end));
    };

    const getStandartDate = (date) => {
        if(!date) {
            return null;
        }
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return setZero(day) + setZero(month) + year;
    }

    const setZero = (number) => {
        if(+number < 10) {
            return "0" + number + ".";
        }
        return number + ".";
    }

    const hideCalendar = (e) => {
        const targetClass = e.relatedTarget? e.relatedTarget.parentElement.className : "";
        if(targetClass === "react-datepicker__week") {
            e.preventDefault();
        }else {
            setIsSelectDate(false);
        }
    }

    return (
        <LayoutLk currentLink="/documents">
            <div className="report">
                <div className="lk-top report__top">
                    <div className="report__left">
                        <h2 className="report__title title-2">
                            Отчеты и документы
                        </h2>
                    </div>
                    <div className="report__right">
                        <Select title="10" optionsText={["10", "20", "30"]} classNameGeneral="lk-select_pages"
                                classNameOption="report__status-option lk__option_pages"
                                classNameTitle="lk__select-top_pages report__select-top"
                                setOption={(count) => setCountNeedOfSelect(count)} variables={["10", "20", "30"]}/>
                    </div>
                </div>
                <Radios className="report__radios" name="doc-type-report" indexValueDefault={1} setTypeCargo={setTypeFilter} inputs={[
                    {beforeId: "report", afterId: "rept", value: "report", html: "Отчеты"},
                    {beforeId: "report", afterId: "doc", value: "doc", html: "Документы"},
                ]}/>
                <div className="report__window lk__window">
                    <div className="lk-window__top" onClick={() => setIsShowFilters(!isShowFilters)}>
                        <div className="lk-window__top-text">Сортировать</div>
                        <div className="lk-window__top-icon" />
                    </div>
                    <div className={isShowFilters? "window-content report__window-content window-content_active" : "window-content report__window-content"}>
                        <div className={isSelectDate? "actual__date-window actual__date-window_active" : "actual__date-window"} tabIndex={0}
                             onBlur={hideCalendar}
                             onMouseDown={() => setIsSelectDate(!isSelectDate)}>
                            <div className="actual__date actual__date_from">
                                <Calendar className="info__calendar" />
                                {dateStartFilterSelect? dateStartFilterSelect : getStandartDate(new Date())}
                            </div>
                            -
                            <div className="actual__date actual__date_to">
                                <Calendar className="info__calendar"/>
                                {dateFinishFilterSelect? dateFinishFilterSelect : getStandartDate(new Date())}
                            </div>
                            <div className={isSelectDate? "actual__datepicker" : "actual__datepicker none"} onMouseDown={(e) => e.stopPropagation()}>
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
                        <Select title="Тип документа" optionsText={["Бухгалтерский", "Иной"]} classNameGeneral="book__new report__type"
                                classNameOption="actual__status-option"
                                classNameTitle="book__select-top" dropValue={dropValueOfSelects} setDropValue={setDropValueOfSelects}
                                setOption={(type) => setDocTypeFilter(type)} variables={["accounting", "other"]}/>
                        <div className="book__buttons report__buttons">
                            <button className="actual__button book__button-top actual__button-accept btn btn_green" onClick={useFilters}>
                                Показать
                            </button>
                            <button className="actual__button book__button-top actual__button-clear btn btn_blue" onClick={dropFilters}>
                                Сбросить
                            </button>
                        </div>
                    </div>
                </div>
                <div className="report__content lk__content">
                    <table className="report__table">
                        <tr className="report__row">
                            <th className="report__cell-head report__cell-name">Название документа</th>
                            <th className="report__cell-head report__cell-type">Тип документа</th>
                            <th className="report__cell-head report__cell-number">Номер заказа</th>
                            <th className="report__cell-head report__cell-date">Дата поступления</th>
                            <th className="report__cell-head report__cell-button" />
                        </tr>
                        {docs? docs.map((d) => {
                            return(
                                <tr className="report_row">
                                    <td className="report__cell report__cell-name">{d.name}</td>
                                    <td className="report__cell report__cell-type">{d.doc_type}</td>
                                    <td className="report__cell report__cell-number"><span className="report_id">№{d.dostavista_id}</span></td>
                                    <td className="report__cell report__cell-date">{d.dateCreate}</td>
                                    <td className="report__cell report__cell-button">
                                        <a href={d.path} className="report__button-cell btn btn_blue" target="_blank" download>
                                            <img src="/static/img/lk/report/icon.svg" alt="" className="report__icon" />
                                            <img src="/static/img/lk/report/icon_white.svg" alt="" className="report__icon-white" />
                                            Скачать
                                        </a>
                                    </td>
                                </tr>
                            );
                        }) : ""}
                    </table>
                </div>
                <Manage countPages={countPages} currentPage={currentPage} setCurrentPage={(page) => setCurrentPageOfManage(page)}/>
            </div>
        </LayoutLk>
);
}

export default Documents;