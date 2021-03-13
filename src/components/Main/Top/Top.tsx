import React from "react";
import c from "./Top.module.css";
import Link from "next/link";

type PropsType = {
    thisPage: string
}

const Top: React.FC<PropsType> = (props) => {
    const { thisPage: thisPage } = props;

    return(
        <section className={c.top}>
            <div className={c.top__bg} />
            <div className={c.top__container + " container"}>
                <div className={c.breadcrumbs}>
                    <Link href="/">
                        <a className={c.breadcrumb + " link link_green"}>
                            Главная
                        </a>
                    </Link>
                    <span className={`${c.breadcrumb} ${c.breadcrumb_active}`}>
                        / {thisPage}
                    </span>
                </div>
                <h2 className={c.top__title + " title-2"}>
                    {thisPage}
                </h2>
            </div>
        </section>
    );
}

export default Top;