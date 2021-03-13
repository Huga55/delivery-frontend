import LayoutLk from "../../components/layouts/LayoutLk";
import Select from "../../components/common/Select/Select";
import Modal from "../../components/Modal/Modal";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Spinner from "../../components/common/Spinner/Spinner";
import Manage from "../../components/common/Manage/Manage";
import {
    deleteAddress,
    getAllAddresses,
    setAddressForChangeAction,
    setCountNeedAction,
    setCurrentPageAction
} from "../../../redux/reducers/book-reducer";
import { useDispatch } from "react-redux";
import {setIdActiveAddressAction} from "../../../redux/reducers/form-reducer";
import {useRouter} from "next/router";


const Book = () => {
    const [modalIsActive, setModalIsActive] = useState(false);
    const [countNeedOfSelect, setCountNeedOfSelect] = useState("15");//count of records for watch
    const [nameFilterOfSelect, setNameFilterOfSelect] = useState("asc");//value for filter by name
    const [newFilterOfSelect, setNewFilterOfSelect] = useState("desc");//value for filter by new / old
    const [dropValueOfSelects, setDropValueOfSelects] = useState(false);//to drop selects value after click by button "drop"
    const [isShowFilters, setIsShowFilters] = useState(false);//for mobile, to show / to hide filters


    const dispatch = useDispatch();

    const router = useRouter();

    const { addresses, countAddresses, countNeed, currentPage } = useSelector(state => state.book);
    const [currentPageOfManage, setCurrentPageOfManage] = useState(currentPage);

    const countPages = Math.ceil(countAddresses / countNeed);

    useEffect( () => {
        //change count pages to show
        dispatch(setCountNeedAction(countNeedOfSelect));
        dispatch(setCurrentPageAction(1));
        dispatch(getAllAddresses(+countNeedOfSelect, 1));
        setDropValueOfSelects(true);
    }, [countNeedOfSelect])

    useEffect( () => {
        dispatch(setCurrentPageAction(currentPageOfManage));
        dispatch(getAllAddresses(countNeed, +currentPageOfManage));
    }, [currentPageOfManage])

    const changeDataOrganization = (id_address) => {
        dispatch(setAddressForChangeAction(id_address));
        setModalIsActive(true);
    }

    const useFilters = () => {
        dispatch(getAllAddresses(countNeed, +currentPageOfManage, nameFilterOfSelect, newFilterOfSelect));
    }

    const dropFilters = () => {
        setDropValueOfSelects(true);
    }

    const deleteOneAddress = (id_organization, id_address) => {
        dispatch(deleteAddress({id_organization, id_address}));
        dispatch(getAllAddresses(countNeed, +currentPageOfManage));
    }

    const createOrder = async (id) => {
        await dispatch(setIdActiveAddressAction(id));
        await router.push("/lk/order");
    }

    return (
        <LayoutLk currentLink="/book">
            {modalIsActive ? <Modal type="append" setModal={setModalIsActive} /> : ""}
            <div className="book">
                <div className="lk-top">
                    <div className="book__left">
                        <h2 className="book__title title-2">
                            Адресная книга
                        </h2>
                    </div>
                    <div className="book__right">
                        <button className="book__button btn btn_green" onClick={() => setModalIsActive(true)}>
                            Добавить адресата
                        </button>
                        <Select title="15" optionsText={["15", "20", "30"]} classNameGeneral="lk-select_pages"
                                classNameOption="book__status-option lk__option_pages"
                                classNameTitle="lk__select-top_pages book__select-top"
                                setOption={(count) => setCountNeedOfSelect(count)} variables={["15", "20", "30"]}/>
                    </div>
                </div>
                <button className="book__button book__button_mobile btn btn_green" onClick={() => setModalIsActive(true)}>
                    Добавить адресата
                </button>
                <div className="book__window lk__window">
                    <div className="lk-window__top" onClick={() => setIsShowFilters(!isShowFilters)}>
                        <div className="lk-window__top-text">Сортировать</div>
                        <div className="lk-window__top-icon" />
                    </div>
                    <div className={isShowFilters? "book__window-content window-content window-content_active" : "window-content book__window-content"}>
                        <Select title="От А до Я" optionsText={["От А до Я", "От Я до А"]}
                                classNameGeneral="book__letter"
                                classNameTitle="book__select-top" classNameOption="actual__status-option"
                                variables={["asc", "desc"]} setOption={setNameFilterOfSelect}
                                dropValue={dropValueOfSelects} setDropValue={setDropValueOfSelects}/>
                        <Select title="Новее" optionsText={["Новее", "Старое"]} classNameGeneral="book__new"
                                classNameTitle="book__select-top" classNameOption="actual__status-option" variables={["desc", "asc"]}
                                setOption={setNewFilterOfSelect} dropValue={dropValueOfSelects} setDropValue={setDropValueOfSelects}/>
                        <div className="book__buttons">
                            <button className="actual__button book__button-top actual__button-accept btn btn_green" onClick={useFilters}>
                                Показать
                            </button>
                            <button className="actual__button book__button-top actual__button-clear btn btn_blue" onClick={dropFilters}>
                                Сбросить
                            </button>
                        </div>
                    </div>
                </div>
                <div className="book__content">
                    <table className="book__table">
                        <tr className="book__row">
                            <th className="book__cell-head book__cell-name">Наименование организации</th>
                            <th className="book__cell-head book__cell-inn">ИНН</th>
                            <th className="book__cell-head book__cell-address">Адрес</th>
                            <th className="book__cell-head book__cell-contact">Контактное лицо</th>
                            <th className="book__cell-head book__cell-phone">Телефон</th>
                            <th className="book__cell-head book__cell-action">Действие</th>
                        </tr>
                        {addresses ? addresses.map((elem) => {
                            return (
                                <tr className="book__row">
                                    <td className="book__cell book__cell-name">{elem.name_organization ? elem.name_organization : "Название отсутствует"}</td>
                                    <td className="book__cell book__cell-inn">{elem.inn? elem.inn : "ИНН нет"}</td>
                                    <td className="book__cell book__cell-address">{elem.address}</td>
                                    <td className="book__cell book__cell-contact">{elem.name ? elem.name : "Название отсутствует"}</td>
                                    <td className="book__cell book__cell-phone">{elem.phone ? elem.phone : "Телефон отсутствует"}</td>
                                    <td className="book__cell book__cell-action">
                                        <div className="book__accept btn btn_blue" onClick={() => createOrder(elem.id_address)}>
                                            Оформить заявку
                                        </div>
                                        <div className="book__actions">
                                            <span className="book__action book__action_write" onClick={() => changeDataOrganization(elem.id_address)}/>
                                            <span className="book__action book__action_copy"/>
                                            <span className="book__action book__action_delete" onClick={() => deleteOneAddress(elem.id_organization, elem.id_address)}/>
                                        </div>
                                    </td>
                                </tr>
                            );
                        }) : <Spinner whiteBg={false}/>
                        }
                    </table>
                </div>
                <Manage countPages={countPages} currentPage={currentPage} setCurrentPage={(page) => setCurrentPageOfManage(page)}/>
            </div>
        </LayoutLk>
    );
}

export default Book;