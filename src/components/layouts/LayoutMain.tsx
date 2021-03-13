import React from "react";
import Header from "../Main/Header/Header";
import Footer from "../Main/Footer/Footer";
import HocLayout from "./HocLayout";

const LayoutMain = ({children}) => {
    return (
        <HocLayout>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </HocLayout>
    );
}

export default LayoutMain;