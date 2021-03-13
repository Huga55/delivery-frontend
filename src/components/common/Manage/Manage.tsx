import React from "react";
import c from "./Manage.module.css";

type PropsType = {
    countPages: number
    currentPage: number
    setCurrentPage: (page: number) => void
}

// @ts-ignore
const Manage: React.FC<PropsType> = (props) => {
    const { countPages, currentPage, setCurrentPage } = props;

    const numbers = [];

    for(let i = 1; i <= countPages; i++) {
        numbers.push(i);
    }

    const changeCurrentPage = (page: number) => {
        if(page === 0) {
            return;
        }
        setCurrentPage(page);
    }

    if(countPages === 0) {
        return "";
    }

    return(
        <div className={c["manage-page"]}>
            <div className={`${c["manage-page__left"]} ${c["manage-arrow"]}`} onClick={() => changeCurrentPage(currentPage <= 1? 0 : currentPage - 1)}>Назад</div>
            <div className={c["manage-page__content"]}>
                {
                    numbers.map((n, index) => {
                        if(n === currentPage) {
                            return <div className={`${c["manage-page__numb"]} ${c["manage-page__numb_active"]}`} key={index}>{n}</div>
                        }
                        if(n === 1 || n === countPages) {
                            return <div className={c["manage-page__numb"]} onClick={() => changeCurrentPage(n)} key={index}>{n}</div>
                        }
                        if(n === currentPage - 1 || n === currentPage + 1) {
                            return <div className={`${c["manage-page__numb"]} ${c["manage-page__other"]}`}
                                        onClick={() => changeCurrentPage(n === currentPage - 1? n - 1 : n + 1)} key={index}>...</div>
                        }
                    })
                }
            </div>
            <div className={`${c["manage-page__right"]} ${c["manage-arrow"]}`} onClick={() => changeCurrentPage(currentPage >= countPages? 0 : currentPage + 1)}>Вперед</div>
        </div>
    );
}

export default Manage;