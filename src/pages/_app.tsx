import React, {useEffect, useState} from "react";
import type { AppProps  } from 'next/app'
import "../../styles/main.css";
import {Provider} from "react-redux";
import store from "./../../redux/store";
import {createWrapper} from "next-redux-wrapper";
import { useDispatch, useSelector } from "react-redux";
import {getAuth, setIsInitializeAction} from "../../redux/reducers/initialize-reducer";
import Spinner from "../components/common/Spinner/Spinner";


const MyApp = ({ Component, pageProps }: AppProps) => {

    const dispatch = useDispatch();
    const { isInitialize } = useSelector(state => state.initialize);

    useEffect(() => {
        dispatch(getAuth());
        dispatch(setIsInitializeAction(true));
    }, [])

    if(isInitialize) {
        return <Spinner whiteBg={true} />
    }

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);