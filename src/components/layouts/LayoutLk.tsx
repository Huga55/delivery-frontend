import React, {useEffect, useState} from "react";
import Sidebar from "../LK/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import Spinner from "../common/Spinner/Spinner";
import {useRouter} from "next/router";
import {logOut} from "../../../redux/reducers/lk-reducer";
import { useDispatch } from "react-redux";
import HocLayout from "./HocLayout";
import {getAllOrders, setSearchValueAction} from "../../../redux/reducers/actualOrder-reducer";
import {AppStateType} from "../../../redux/reducers";

const LayoutLk = ({ children, currentLink }) => {
    const { isAuth, isInitialize } = useSelector((state: AppStateType) => state.initialize);
    const { isAjax } = useSelector(state => state.lk);

    const router = useRouter();

    const { name, avatar } = useSelector(state => state.user);

    const { filters, countNeed, currentPage } = useSelector(state => state.actualOrder);
    const { dateStart, dateFinish, byStatus, byPrice, bySearh: bySearch } = filters;
    const [search, setSearch] = useState(bySearch? bySearch : "");

    const dispatch = useDispatch();

    useEffect(() => {
        if(!isAuth && !isInitialize) {
            router.push("/");
        }
    }, [isInitialize, isAuth])

    useEffect(() => {
        if(!bySearch) {
            setSearch("");
        }
        setSearch(bySearch);
    }, [bySearch])

    if(!isAuth) {
        return <Spinner whiteBg={true}/>;
    }

    const logout = async () => {
        await dispatch(logOut());
        router.push("/");
    }

    const getSearchResult = async (e) => {
        e.preventDefault();
        if(search === "") {
            return;
        }
        const data = {
            countNeed,
            currentPage,
            dateStart,
            dateFinish,
            statusFilter: byStatus,
            priceFilter: byPrice,
            searchFilter: search,
        }
        await dispatch(setSearchValueAction(search));
        if(router.pathname !== "/lk") {
            await router.push("/lk");
        }
        await dispatch(getAllOrders(data));
    }

    return(
        <HocLayout>
            <div className="lk">
                {isAjax? <Spinner whiteBg={false} /> : ""}
                <Sidebar currentLink={currentLink}/>
                <div className="lk-right">
                    <div className="container lk__container">
                        <div className="info">
                            <div className="info__left">
                                <div className="info__name title-3">
                                    Express2You
                                </div>
                                <form action="" className="info__form" onSubmit={(e) => getSearchResult(e)}>
                                    <input type="text" name="search" className="info__input input" value={search}
                                           placeholder="Поиск по документам, заказам, адресатам" onChange={(e) => setSearch(e.currentTarget.value)}/>
                                           <button className="info__search">
                                               <img src="/static/img/other/search.svg" alt=""/>
                                           </button>
                                </form>
                            </div>
                            <div className="info__right">
                                <div className="info__user">
                                    <div className="info__user-bg">
                                        <img src={avatar? avatar : "/static/img/lk/info/avatar.svg"} alt="" className="info__avatar" />
                                    </div>
                                    <div className="info__user-name">
                                        {name}
                                    </div>
                                </div>
                                <span className="info__exit" onClick={() => logout()}/>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </HocLayout>
    );
}

export default LayoutLk;